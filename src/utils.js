import axios from "axios";
import { existsSync, mkdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { JSDOM } from "jsdom";
import timezoneOffsets from "./tzOffsets";

export let TIMEZONE_OFFSET = 0;

function convertTimeTo24Hour(timeString) {
  // Extract the hour and minute from the time string
  const timeParts = timeString.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
  if (!timeParts) {
    throw new Error("Invalid time string");
  }
  let hour = parseInt(timeParts[1]);
  const minute = parseInt(timeParts[2]);
  const amPm = timeParts[3].toLowerCase();

  // Convert the hour to 24-hour format
  if (amPm === "pm" && hour !== 12) {
    hour += 12;
  } else if (amPm === "am" && hour === 12) {
    hour = 0;
  }

  // Pad the hour and minute with leading zeros if necessary
  const hourString = hour.toString().padStart(2, "0");
  const minuteString = minute.toString().padStart(2, "0");

  // Return the time in 24-hour format
  return `${hourString}:${minuteString}`;
}

export function parseDateString(dateString, year) {
  const [month, dayStr, unused, timeStr, tz] = dateString.split(" ");
  const day = parseInt(dayStr);
  const time = convertTimeTo24Hour(timeStr);

  const date = new Date(`${month} ${day}, ${year} ${time}:00 Z`);
  const GMTDate = new Date(date.getTime() - timezoneOffsets[tz] * 60 * 1000);

  TIMEZONE_OFFSET = timezoneOffsets[tz];

  return GMTDate;
}

export function countForwardSlashes(str) {
  const regex = /\//g;
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

function fetchPage(url) {
  const HTMLData = axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.config) {
        console.error(`There was an error with ${error.config.url}.`);
      }
      console.error(error.toJSON());
    });

  return HTMLData;
}

export async function fetchFromWebOrCache(
  url,
  ignoreCache = true
) {
  // If the cache folder doesn't exist, create it
  if (!existsSync(resolve("./src", ".cache"))) {
    mkdirSync("./src/.cache");
  }
  console.log(`Getting data for ${url}...`);
  if (
    !ignoreCache &&
    existsSync(
      resolve("./src", `.cache/${Buffer.from(url).toString("base64")}.html`)
    )
  ) {
    console.log(`I read ${url} from cache`);
    const HTMLData = await readFile(
      resolve("./src", `.cache/${Buffer.from(url).toString("base64")}.html`),
      { encoding: "utf8" }
    );
    const dom = new JSDOM(HTMLData);
    return dom.window.document;
  } else {
    console.log(`I fetched ${url} fresh`);
    const HTMLData = await fetchPage(url);
    if (!ignoreCache && HTMLData) {
      writeFile(
        resolve("./src", `.cache/${Buffer.from(url).toString("base64")}.html`),
        HTMLData,
        { encoding: "utf8" }
      );
    }
    const dom = new JSDOM(HTMLData);
    return dom.window.document;
  }
}