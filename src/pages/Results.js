import React from "react";

export default function Results(){
    return(
        <div className="w-full overflow-hidden" >
            <div className="relative h-1/4 flex flex-wrap overflow-hidden justify-center top-[-10px]">
                <div className="absolute bottom-[145px] left-12 z-10 h-1/5 w-4/5 flex flex-col">
                    <p className="rounded-lg text-4xl bg-white w-fit text-base font-mono">hackathon name</p>
                    <p className="rounded-lg text-7xl bg-white w-fit font-mono font-bold mt-2">by the numbers</p>
                </div>

                <img
                    src="\waves.png"
                    className="mt-[-50px] h-auto overflow-hidden min-w-screen rounded-lg shadow-none duration-300 ease-in-out"
                    alt="" />
            </div>
            <div className="overflow-hidden flex flex-wrap flex-row font-mono justify-between w-4/5 text-4xl mx-auto h-fit gap-24">
                <div className="h-fit ">
                    {/* three things on the left */}
                    <div className="mt-12">
                        <p className="text-6xl text-center">420</p>
                        <p>number of participants</p>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-6xl">69</p>
                        <p>number of commits</p>
                    </div>
                    <div className="mt-12 text-center">
                        <p className="text-6xl ">90</p>
                        <p>number of projects</p>
                    </div>
                </div>

                <div className="overflow-hidden">
                    {/* the two main ones on the right */}
                    <div className="mt-12">
                        <p className="text-6xl text-center">11:00PM</p>
                        <p>hours of most commits</p>
                    </div>
                    <div className="mt-24">
                        <p className="text-6xl text-center">Language</p>
                        <p>most popular language</p>
                    </div>
                    
                </div>
            </div>
        </div>
        
        

        
    );
}