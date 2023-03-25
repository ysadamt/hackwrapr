import react from "react";
import { useState } from "react";
import Slider from 'react-input-slider';

export default function Page1(){
    const [state, setState] = useState({ x: 10});
    const [state2, setState2] = useState({x: 10});

    return(
        <div>
            <div>
                <h3>number of participants</h3>
                <p>take a guess!</p>
            </div>
            <div>
            <Slider
                axis="x"
                x={state.x}
                onChange={({ x }) => setState(state => ({ ...state, x }))}
            />
            </div>
        </div>
    )
}