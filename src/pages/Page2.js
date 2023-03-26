import react, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-input-slider";
import Link from "next/link";


export default function Page2() {
  const [state, setState] = useState({ x: 5000 });
  const [state2, setState2] = useState({ x: 12 });
  const [stateCorrect, setStateCorrect] = useState("unanswered");
  const [stateCorrect2, setStateCorrect2] = useState("unanswered");

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

  const router = useRouter();
  const NUM_COMMITS = router.query.numCommits || 0;
  const HOUR_OCCURRENCES = JSON.parse(router.query.hourOccurrences);
  const MAX_HOUR = findHourWithMostOccurrences(HOUR_OCCURRENCES);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const TOP_LANGUAGES = router.query.topLanguages;
  const SHUFFLED_LANGUAGES = [].concat(TOP_LANGUAGES);

  shuffleArray(SHUFFLED_LANGUAGES);

  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.keyCode) {
        case 39: // ArrowRight
          router.replace({
            pathname: "/language",
            query: {
              hackathonName: router.query.hackathonName,
              numParticipants: router.query.numParticipants,
              numProjects: router.query.numProjects,
              topLanguages: router.query.topLanguages,
              shuffledLanguages: SHUFFLED_LANGUAGES,
              hourOccurrences: router.query.hourOccurrences,
              numCommits: router.query.numCommits,
            },
          });
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div className="pt-28 bg-[#F4EADB] overflow-x-hidden">
      <Link href="/">
        <img
          src="\hackwrapr_logo 1.png"
          className="w-32 absolute left-0 top-2"
        />
      </Link>
      <div>
        <div className="font-bold text-5xl text-[#10254E] text-center">
          number of commits
        </div>
        <div className="font-bold text-xl text-[#10254E] text-center pb-20 mt-4">
          {stateCorrect === "unanswered"
            ? "take a guess!"
            : stateCorrect === "correct"
            ? "correct!"
            : `incorrect! the answer was ${NUM_COMMITS}`}
        </div>
      </div>

      <div className="flex w-screen justify-center">
        <Slider
          axis="x"
          xmax={10000}
          x={state.x}
          onChange={({ x }) => setState((state) => ({ ...state, x }))}
          styles={{
            track: {
              width: 900,
              backgroundColor:
                stateCorrect === "unanswered"
                  ? "rgba(16,37,78,0.25)"
                  : stateCorrect === "correct"
                  ? "rgba(0,255,0,0.25)"
                  : "rgba(255,0,0,0.25)",
            },
            active: {
              backgroundColor: "rgba(16,37,78,0.0)",
            },
            thumb: {
              width: 35,
              height: 35,
            },
            disabled: {
              opacity: 0.5,
            },
          }}
        />
      </div>

      <div className="flex w-screen justify-center">
        <div className="flex w-[900px] justify-between mt-10 font-bold text-xl text-[#10254E]">
          <p>
            0<span className="opacity-0">0000</span>
          </p>
          <p className="text-center">{state.x}</p>
          <p>10000</p>
        </div>
      </div>

      <div className="flex w-screen justify-center">
        <button
          className={`bg-[#10254E] text-white font-bold text-md rounded-2xl w-[100px] h-[50px] mt-5 ${
            stateCorrect !== "unanswered" ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => {
            if (state.x === Number(NUM_COMMITS)) {
              setStateCorrect("correct");
            } else {
              setStateCorrect("incorrect");
            }
          }}
          disabled={stateCorrect !== "unanswered"}
        >
          guess
        </button>
      </div>

      <div className="pt-28">
        <div className="font-bold text-5xl text-[#10254E] text-center">
          hour with the most commits
        </div>
        <div className="font-bold text-xl text-[#10254E] text-center pb-20 mt-4">
          {stateCorrect2 === "unanswered"
            ? "take a guess!"
            : stateCorrect2 === "correct"
            ? "correct!"
            : `incorrect! the answer was ${
                MAX_HOUR < 12 ? MAX_HOUR : MAX_HOUR - 12
              } ${MAX_HOUR < 12 ? "am" : "pm"}`}
        </div>
      </div>

      <div className="flex w-screen justify-center">
        <Slider
          axis="x"
          xmax={23}
          x={state2.x}
          onChange={({ x }) => setState2((state2) => ({ ...state2, x }))}
          styles={{
            track: {
              width: 900,
              backgroundColor:
                stateCorrect2 === "unanswered"
                  ? "rgba(16,37,78,0.25)"
                  : stateCorrect2 === "correct"
                  ? "rgba(0,255,0,0.25)"
                  : "rgba(255,0,0,0.25)",
            },
            active: {
              backgroundColor: "rgba(16,37,78,0.0)",
            },
            thumb: {
              width: 35,
              height: 35,
            },
            disabled: {
              opacity: 0.5,
            },
          }}
        />
      </div>

      <div className="flex w-screen justify-center">
        <div className="flex w-[900px] justify-between mt-10 font-bold text-xl text-[#10254E]">
          <p>12am</p>
          <p className="text-center">
            {state2.x === 0
              ? "12am"
              : state2.x === 12
              ? "12pm"
              : state2.x < 12
              ? state2.x + "am"
              : state2.x - 12 + "pm"}
          </p>
          <p>11pm</p>
        </div>
      </div>

      <div className="flex w-screen justify-center pb-10">
        <button
          className={`bg-[#10254E] text-white font-bold text-md rounded-2xl w-[100px] h-[50px] mt-5 ${
            stateCorrect2 !== "unanswered"
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          onClick={() => {
            if (state2.x === Number(MAX_HOUR)) {
              console.log(state2.x, MAX_HOUR);
              setStateCorrect2("correct");
            } else {
              console.log(state2.x, MAX_HOUR);
              setStateCorrect2("incorrect");
            }
          }}
          disabled={stateCorrect2 !== "unanswered"}
        >
          guess
        </button>
      </div>
    </div>
  );
}
