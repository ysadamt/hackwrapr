import react from "react";
import { useState } from "react";
import Slider from 'react-input-slider';

export default function Page2(){
    const [state, setState] = useState({x: 5000});
    const [state2, setState2] = useState({x: 12});

    return(
        <div className='pt-28 bg-[#F4EADB]'>
            <div>
                <div className='font-bold text-5xl text-[#10254E] text-center'>number of commits</div>
                <div className='font-bold text-xl text-[#10254E] text-center pb-20'>take a guess!</div>
            </div>

            <div className='flex w-screen justify-center'>
                <Slider
                    axis="x"
                    xmax= {10000}
                    x={state.x}
                    onChange={({ x }) => setState(state => ({ ...state, x }))}
                    styles={{
                        track: {
                            width: 900,
                        backgroundColor: 'rgba(16,37,78,0.25)'
                        
                        },
                        active: {
                        backgroundColor: 'rgba(16,37,78,0.0)'
                        },
                        thumb: {
                        width: 35,
                        height: 35
                        },
                        disabled: {
                        opacity: 0.5
                        }
                    }}
                />
            </div>

            <div className="flex justify-center">
                <div className='flex w-[900px] justify-between mt-10 font-bold text-xl text-[#10254E]'>
                    <p>
                        0
                    </p>
                    <p className="text-center">
                        {state.x}
                    </p>
                    <p>
                        10000
                    </p>
                </div>
            </div>
            
            
            <div className="pt-28">
                <div className='font-bold text-5xl text-[#10254E] text-center'>hour with the most commits</div>
                <div className='font-bold text-xl text-[#10254E] text-center pb-20'>take a guess!</div>
            </div>

            <div className='flex w-screen justify-center'>
                <Slider
                    axis="x"
                    xmax= {23}
                    x={state2.x}
                    onChange={({ x }) => setState2(state2 => ({ ...state2, x }))}
                    styles={{
                        track: {
                            width: 900,
                        backgroundColor: 'rgba(16,37,78,0.25)'
                        
                        },
                        active: {
                        backgroundColor: 'rgba(16,37,78,0.0)'
                        },
                        thumb: {
                        width: 35,
                        height: 35
                        },
                        disabled: {
                        opacity: 0.5
                        }
                    }}
                />
            </div>

            <div className="flex justify-center pb-40">
                <div className='flex w-[900px] justify-between mt-10 font-bold text-xl text-[#10254E]'>
                    <p>
                        12am
                    </p>
                    <p className="text-center">
                        {
                        state2.x === 0 ? "12am": 
                        state2.x===12 ? "12pm":
                        state2.x < 12? state2.x + "am": state2.x - 12 + "pm"
                        }
                    </p>
                    <p>
                        11pm
                    </p>
                </div>
            </div>

        </div>
    )
}