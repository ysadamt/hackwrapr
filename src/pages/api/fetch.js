import {
  countForwardSlashes,
  fetchFromWebOrCache,
  parseDateString,
} from "@/utils";
import * as dotenv from "dotenv";
import axios from "axios";
import { TIMEZONE_OFFSET } from "@/utils";

dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const MAX_COMMITS_PER_PAGE = 100;

async function fetchRepoLanguages(repo) {
  const languages = axios
    .get(`https://api.github.com/repos/${repo}/languages`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      if (error.config) {
        console.error(`There was an error with ${error.config.url}.`);
      }
      // console.error(error.toJSON());
    });

  return languages;
}

async function fetchTopLanguages(repos) {
  let languages = new Map();
  const languageObjectsPromises = [];

  for (const repo of repos) {
    try {
      languageObjectsPromises.push(fetchRepoLanguages(repo));
    } catch (error) {
      // could be a 404 error, or a 403 error (rate limit exceeded)
      // repo doesn't exist, or we've hit the rate limit
      console.error(`There was an error fetching languages with ${repo}.`);
      continue;
    }
  }

  const languageObjectsSettledResult = await Promise.allSettled(
    languageObjectsPromises
  );

  const languageObjects = languageObjectsSettledResult.map((l) => {
    if (l.status === "fulfilled") {
      return l.value;
    } else {
      return null;
    }
  });

  for (const languageObject of languageObjects) {
    if (languageObject != null) {
      for (const [lang, bytes] of Object.entries(languageObject)) {
        if (languages.has(lang)) {
          languages.set(lang, languages.get(lang) + bytes);
        } else {
          languages.set(lang, bytes);
        }
      }
    }
  }

  const sortedLanguages = new Map(
    [...languages.entries()].sort((a, b) => b[1] - a[1])
  );
  const topThreeLanguages = [...sortedLanguages.keys()].slice(0, 3);

  return topThreeLanguages;
}

async function fetchRepoCommitTimes(repo, since, until) {
  const commitTimes = [];
  let page = 1;

  while (true) {
    const repoCommitsArr = axios
      .get(
        `https://api.github.com/repos/${repo}/commits?page=${page}&per_page=${MAX_COMMITS_PER_PAGE}&since=${since}&until=${until}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        if (error.config) {
          console.error(`There was an error with ${error.config.url}.`);
        }
        // console.error(error.toJSON());
      });

    const repoCommits = await repoCommitsArr;
    const numCommitsPerPage = repoCommits.length;

    if (numCommitsPerPage === 0) {
      break;
    }

    for (const c of repoCommits) {
      commitTimes.push(c.commit.author.date);
    }

    page++;
  }

  return commitTimes;
}

async function fetchAllCommitTimes(startTime, endTime, repos) {
  const commitTimesPromises = [];

  for (const repo of repos) {
    try {
      commitTimesPromises.push(fetchRepoCommitTimes(repo, startTime, endTime));
    } catch (error) {
      // could be a 404 error, or a 403 error (rate limit exceeded)
      // repo doesn't exist, or we've hit the rate limit
      console.error(`There was an error fetching commit times with ${repo}.`);
      continue;
    }
  }

  const commitTimesSettledResult = await Promise.allSettled(
    commitTimesPromises
  );

  const commitTimes = commitTimesSettledResult.map((l) => {
    if (l.status === "fulfilled") {
      return l.value;
    } else {
      return null;
    }
  });

  const allCommitTimes = [];

  for (const commitTime of commitTimes) {
    if (commitTime !== null) {
      allCommitTimes.push(commitTime);
    }
  }

  // -60 accounts for daylight savings time
  const currentTZOffset = TIMEZONE_OFFSET - 60;
  const offsetCommitTimes = allCommitTimes.flat().map((commitTime) => {
    return new Date(
      new Date(commitTime).getTime() + currentTZOffset * 60 * 1000
    );
  });

  return offsetCommitTimes;
}

function fetchHourOccurrences(commitTimes) {
  // 24 hours in a day

  let hourOccurrences = new Map();

  for (let i = 12; i < 24; i++) {
    hourOccurrences.set(i, 0);
  }

  for (let i = 0; i < 12; i++) {
    hourOccurrences.set(i, 0);
  }

  for (const commitTime of commitTimes) {
    const hour = commitTime.getHours();
    hourOccurrences.set(hour, hourOccurrences.get(hour) + 1);
  }
  return JSON.stringify(Array.from(hourOccurrences.entries()));
}

async function fetchRepos(submissions) {
  const repoLinks = submissions
    .filter((s) => s.github.length !== 0)
    .map((s) => s.github);
  const repos = [];
  for (let i = 0; i < repoLinks.length; i++) {
    for (let j = 0; j < repoLinks[i].length; j++) {
      // some github links end with .git, some don't
      if (repoLinks[i][j].endsWith(".git")) {
        repos.push(repoLinks[i][j].slice(19, -4));
      } else {
        repos.push(repoLinks[i][j].slice(19));
      }
    }
  }
  return repos;
}

function extractGithubData(projectPage) {
  const appLinkElements = Array.from(
    projectPage.querySelectorAll("nav.app-links ul li a")
  );

  const githubLinks = appLinkElements
    .filter(
      (element) =>
        element.href.startsWith("https://github.com") &&
        countForwardSlashes(element.href) === 4
    )
    .map((element) => element.href);

  return githubLinks;
}

async function extractPageSubmissions(document) {
  const submissionNameElements = Array.from(
    document.querySelectorAll("div.software-entry-name h5")
  );
  const submissionNames = submissionNameElements.map((element) => {
    return element.textContent?.trim();
  });

  const submissionLinkElements = Array.from(
    document.querySelectorAll("a.link-to-software")
  );
  const submissionLinks = submissionLinkElements.map((element) => {
    return element.href;
  });

  const submissionGithubs = [];

  // put all promises in an array for faster execution
  const promises = [];
  for (let i = 0; i < submissionLinks.length; i++) {
    promises.push(fetchFromWebOrCache(submissionLinks[i]));
  }

  const projectPages = await Promise.all(promises);

  for (let i = 0; i < projectPages.length; i++) {
    const projectPage = projectPages[i];
    submissionGithubs.push(extractGithubData(projectPage));
  }

  return submissionNames.map((name, i) => {
    return JSON.parse(
      JSON.stringify(
        {
          name: name,
          url: submissionLinks[i],
          github: submissionGithubs[i]
        }
      )
    );
  });
}

async function getStartAndEndTimes(link) {
  // get current year
  const mainPage = await fetchFromWebOrCache(`https://${link}`);

  const yearElement = mainPage.querySelector(
    "section.info:nth-child(1) div.info-with-icon div.info strong"
  );
  const yearStr = yearElement.textContent?.split(",")[1].trim();
  const year = parseInt(yearStr);

  // get start and end times
  const timeDetails = await fetchFromWebOrCache(
    `https://${link}/details/dates`
  );
  const startTimeElement = timeDetails.querySelector(
    "table.no-borders tr td:nth-child(2)"
  );
  const startTimeStr = startTimeElement.textContent?.trim();
  const endTimeElement = timeDetails.querySelector(
    "table.no-borders tr td:nth-child(3)"
  );
  const endTimeStr = endTimeElement.textContent?.trim();

  const startTime = parseDateString(startTimeStr, year);
  const endTime = parseDateString(endTimeStr, year);

  return [JSON.stringify(startTime), JSON.stringify(endTime)];
}

async function getNumProjects(link) {
  const projectGallery = await fetchFromWebOrCache(
    `https://${link}/project-gallery`
  );

  const numProjectsElement = Array.from(
    projectGallery.querySelectorAll("span.items_info p b:nth-child(2)")
  );
  const numProjects = Number(numProjectsElement[0].textContent?.trim());
  return numProjects;
}

async function getNumParticipants(link) {
  const mainPage = await fetchFromWebOrCache(`https://${link}`);

  const numParticipantsElement = mainPage.querySelector(
    "section.info:nth-child(2) table tr:nth-child(2) td:nth-child(2) strong"
  );
  const numParticipantsStr = numParticipantsElement.textContent?.trim();
  const numParticipants = parseInt(numParticipantsStr);

  return numParticipants;
}

async function getAllSubmissions(link) {
  const allSubmissions = [];

  const numProjects = await getNumProjects(link);
  const numPages = Math.ceil(numProjects / 24);
  let count = 1;

  while (count <= numPages) {
    const projectGalleryPage = await fetchFromWebOrCache(
      `https://${link}/project-gallery?page=${count}`
    );
    const pageSubmissions = extractPageSubmissions(projectGalleryPage);

    allSubmissions.push(...(await pageSubmissions));
    count++;
  }
  return allSubmissions;
}

export default async function handler(req, res) {
  const link = req.body.link;

  const submissions = await getAllSubmissions(link);
  const repos = await fetchRepos(submissions);
  const [startTime, endTime] = await getStartAndEndTimes(link);
  const commitTimes = await fetchAllCommitTimes(startTime, endTime, repos);

  const NUM_PARTICIPANTS = await getNumParticipants(link);
  const NUM_PROJECTS = await getNumProjects(link);
  const NUM_COMMITS = commitTimes.length;
  const TOP_LANGUAGES = await fetchTopLanguages(repos);
  const HOUR_OCCURRENCES = fetchHourOccurrences(commitTimes);

  const result = {
    numParticipants: NUM_PARTICIPANTS,
    numProjects: NUM_PROJECTS,
    numCommits: NUM_COMMITS,
    topLanguages: TOP_LANGUAGES,
    hourOccurrences: HOUR_OCCURRENCES,
  };

  res.status(200).json(result);
}