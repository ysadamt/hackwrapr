import React from "react";
import { useRouter } from "next/router";

export default function Results() {
  const router = useRouter();

  const HACKATHON_NAME = router.query.hackathonName;
  const NUM_PARTICIPANTS = router.query.numParticipants || 0;
  const NUM_PROJECTS = router.query.numProjects || 0;
  const NUM_COMMITS = router.query.numCommits || 0;
  const TOP_LANGUAGES = router.query.topLanguages;

  function findHourWithMostOccurrences(arr) {
    let maxHour = null;
    let maxCount = 0;
    for (const [hour, count] of arr) {
      if (count > maxCount) {
        maxCount = count;
        maxHour = hour;
      }
    }
    return maxHour;
  }

  const HOUR_OCCURRENCES = JSON.parse(router.query.hourOccurrences);
  const MAX_HOUR = findHourWithMostOccurrences(HOUR_OCCURRENCES);

  return (
    <div className="w-full overflow-hidden bg-[#F4EADB] h-screen">
      <img
        src="\hackwrapr_logo 1.png"
        className="w-32 absolute right-0 bottom-2"
      />
      <div className="relative h-1/4 flex flex-wrap overflow-hidden justify-center top-[-10px]">
        <div className="absolute bottom-[115px] left-12 z-10 h-1/5 w-4/5 flex flex-col mx-1">
          <p className="rounded-lg text-5xl font-bold bg-white w-fit p-2">
            {HACKATHON_NAME}
          </p>
          <p className="rounded-lg text-2xl bg-white w-fit font-bold mt-2 p-2">
            by the numbers
          </p>
        </div>

        <img
          src="\waves.png"
          className="mt-[-50px] h-auto overflow-hidden w-screen rounded-lg shadow-none duration-300 ease-in-out"
          alt=""
        />
      </div>
      <div className="overflow-hidden flex flex-wrap flex-row justify-between w-4/5 text-4xl mx-auto h-fit gap-24 pt-3">
        <div className="h-fit ">
          {/* three things on the left */}
          <div className="mt-12">
            <p className="text-6xl font-bold text-center">{NUM_PARTICIPANTS}</p>
            <p>number of participants</p>
          </div>
          <div className="mt-12 text-center">
            <p className="text-6xl font-bold ">{NUM_COMMITS}</p>
            <p>number of commits</p>
          </div>
          <div className="mt-12 text-center">
            <p className="text-6xl  font-bold ">{NUM_PROJECTS}</p>
            <p>number of projects</p>
          </div>
        </div>

        <div className="overflow-hidden">
          {/* the two main ones on the right */}
          <div className="mt-12">
            <p className="text-6xl text-center font-bold">{MAX_HOUR < 12 ? `${MAX_HOUR} am` : `${MAX_HOUR} pm`}</p>
            <p>hours of most commits</p>
          </div>
          <div className="mt-24">
            <p className="text-6xl text-center font-bold">{TOP_LANGUAGES[0]}</p>
            <p>most popular language</p>
          </div>
        </div>
      </div>
    </div>
  );
}
