import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Language() {
  const [correct, setCorrect] = useState("unanswered");

  const router = useRouter();

  const TOP_LANGUAGES = router.query.topLanguages;
  const SHUFFLED_LANGUAGES = router.query.shuffledLanguages;

  return (
    <div className="pt-28 bg-[#F4EADB] overflow-x-hidden">
      <div className="font-bold text-5xl text-[#10254E] text-center">
        most popular language
      </div>
      <div className="font-bold text-xl text-[#10254E] text-center">
        take a guess!
      </div>

      <div className="flex flex-col items-center justify-center ">
        <div className="grid grid-cols-2 gap-20 content-center w-screen pt-32 pb-28 px-48">
          {SHUFFLED_LANGUAGES.map((language) => (
            <button
              className={`font-bold  h-40 p-16 w-full px-4 text-center text-[#10254E] rounded-2xl text-2xl hover:shadow-md hover:shadow-black/30 ${
                correct === "unanswered"
                  ? "bg-[rgba(16,37,78,0.25)]"
                  : correct === "correct"
                  ? "bg-[rgba(0,255,0,0.25)] cursor-not-allowed"
                  : "bg-[rgba(255,0,0,0.25)] cursor-not-allowed"
              }`}
              onClick={() => {
                if (language === TOP_LANGUAGES[0]) {
                  setCorrect("correct");
                } else {
                  setCorrect("incorrect");
                }
              }}
              disabled={correct !== "unanswered" ? true : false}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
