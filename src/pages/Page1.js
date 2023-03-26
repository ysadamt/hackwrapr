import react, { useEffect } from "react";
import { useState } from "react";
import Slider from "react-input-slider";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Page1() {
  const [state, setState] = useState({ x: 1000 });
  const [state2, setState2] = useState({ x: 100 });
  const [stateCorrect, setStateCorrect] = useState("unanswered");
  const [stateCorrect2, setStateCorrect2] = useState("unanswered");

  const router = useRouter();
  const NUM_PARTICIPANTS = router.query.numParticipants || 0;
  const NUM_PROJECTS = router.query.numProjects || 0;

  useEffect(() => {
    console.log(NUM_PROJECTS);
    function handleKeyDown(event) {
      switch (event.keyCode) {
        case 39: // ArrowRight
          router.replace({
            pathname: "/Page2",
            query: {
              hackathonName: router.query.hackathonName,
              numParticipants: NUM_PARTICIPANTS,
              numProjects: NUM_PROJECTS,
              topLanguages: router.query.topLanguages,
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
    <div className="pt-24 bg-[#F4EADB] overflow-x-hidden">
      <Link href="/" className="overflow-x-hidden">
        <img
          src="\hackwrapr_logo 1.png"
          className="w-32 absolute left-0 top-2"
        />
      </Link>
      <div className="overflow-x-hidden">
        <div className="absolute flex justify-center w-full top-4 font-bold text-[#10254E]">
          use arrow keys to navigate between pages!
        </div>
        <div className="font-bold text-5xl text-[#10254E] text-center">
          number of participants
        </div>
        <div className="font-bold text-xl text-[#10254E] text-center pb-16 mt-4">
          {stateCorrect === "unanswered"
            ? "take a guess!"
            : stateCorrect === "correct"
            ? "correct!"
            : `incorrect! the answer was ${NUM_PARTICIPANTS}`}
        </div>
      </div>

      <div className="flex w-screen justify-center">
        <Slider
          axis="x"
          xmax={2000}
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
            0<span className="opacity-0">000</span>
          </p>
          <p className="text-center">{state.x}</p>
          <p>2000</p>
        </div>
      </div>

      <div className="flex w-screen justify-center">
        <button
          className={`bg-[#10254E] text-white font-bold text-md rounded-2xl w-[100px] h-[50px] mt-5 ${
            stateCorrect !== "unanswered" ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => {
            if (state.x === Number(NUM_PARTICIPANTS)) {
              console.log(state.x, Number(NUM_PARTICIPANTS));
              setStateCorrect("correct");
            } else {
              console.log(state.x, NUM_PARTICIPANTS);
              console.log(state.x, Number(NUM_PARTICIPANTS));

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
          number of projects
        </div>
        <div className="font-bold text-xl text-[#10254E] text-center pb-16 mt-4">
          {stateCorrect2 === "unanswered"
            ? "take a guess!"
            : stateCorrect2 === "correct"
            ? "correct!"
            : `incorrect! the answer was ${NUM_PROJECTS}`}
        </div>
      </div>

      <div className="flex w-screen justify-center">
        <Slider
          axis="x"
          xmax={200}
          x={state2.x}
          onChange={({ x }) => setState2((state2) => ({ ...state2, x }))}
          styles={{
            track: {
              width: 900,
              backgroundColor:
                stateCorrect2 === "unanswered"
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
            0<span className="opacity-0">00</span>
          </p>
          <p className="text-center">{state2.x}</p>
          <p>200</p>
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
            if (state2.x === Number(NUM_PROJECTS)) {
              console.log(state2.x, Number(NUM_PROJECTS));

              setStateCorrect2("correct");
            } else {
              console.log(state.x, Number(NUM_PROJECTS));
              setStateCorrect2("incorrect");
            }
          }}
        >
          guess
        </button>
      </div>
    </div>
  );
}
