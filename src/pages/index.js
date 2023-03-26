import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log(result);
    if (result) {
      router.replace({
        pathname: "/Page1",
        query: {
          hackathonName: result.hackathonName,
          numParticipants: result.numParticipants,
          numProjects: result.numProjects,
          topLanguages: result.topLanguages,
          hourOccurrences: result.hourOccurrences,
          numCommits: result.numCommits,
        },
      });
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answer = await fetch("/api/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: url }),
    });
    const data = await answer.json();
    setResult(data);
  };

  return (
    <div className="pt-24 justify-center bg-[#F4EADB] h-screen overflow-hidden">
      <img src="\hackwrapr_logo 1.png" className="w-32 absolute left-0 top-2"/>
      <div  className=" font-bold text-7xl text-[#10254E] text-center">
        HackWrapr
      </div>
      <div className="font-bold text-xl text-[#10254E] text-center">
        hackathons, enumerated.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center w-screen pt-20">
          <div className="flex bg-[rgba(16,37,78,0.25)]  h-14 w-[900px] rounded-2xl">
            <input
              className="bg-[rgba(16,37,78,0)] focus:outline-none h-14 p-4 w-[900px] rounded-2xl placeholder-[rgba(16,37,78,0.5)]"
              placeholder="ex. rowdyhacks2022.devpost.com"
              value={url}
              required={true}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            ></input>
            {/* <input className='focus:outline-none bg-[rgba(16,37,78,0.0)]  h-14 p-4 w-[900px] rounded-2xl placeholder-[rgba(16,37,78,0.5)]' placeholder='ex. tamuhack-2023.devpost.com'></input> */}
            <div className="mt-4 mx-3">
              <img src="\arrow.png" className="duration-300 ease-in-out w-6 h-6" alt="" />
            </div>
          </div>
        </div>

        <div className="font-bold text-l text-[#10254E] ml-48"></div>

        <div className="flex justify-center items-center w-screen pt-12">
          <button
            type="submit"
            className="p-4 w-[200px] px-4 text-center bg-[#10254E] text-white rounded-2xl text-2xl font-bold hover:shadow-md hover:shadow-black/30"
          >
            enter
          </button>
        </div>
      </form>

      {/* 
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center w-screen pt-20 pb-4">
          <input
            className="bg-[rgba(16,37,78,0.25)]  h-14 p-4 w-[900px] rounded-2xl placeholder-[rgba(16,37,78,0.5)]"
            placeholder="ex. tamuhack-2023.devpost.com"
            value={url}
            required={true}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          ></input>
          <img src="\arrow.png" className=" duration-300 ease-in-out" alt="" />
        </div>

        <div className="flex justify-center items-center w-screen pt-16">
          <button
            type="submit"
            className="bg-[rgba(16,37,78,0.25)] p-4 w-[200px] px-4 text-center text-[#10254E] rounded-2xl text-2xl font-bold"
          >
            enter
          </button>
        </div>
      </form> */}

      <div className="flex flex-wrap justify-center py-14 w-screen">
        <img
          src="\waves.png"
          className="w-screen rounded-lg duration-300 ease-in-out overflow-clip"
          alt=""
        />
      </div>
    </div>
  );
}
