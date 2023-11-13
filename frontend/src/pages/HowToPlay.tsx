import { useState } from "react";

import { NavBar } from "../components/NavBar";
import Header from "../components/Header";
import LetterBox from "../components/LetterBox";

import { cellValueInterface } from "../logic/baseWordle";

export default function HowToPlay(){
    const [open, setOpen] = useState<string>("classic")

    const greenExample:cellValueInterface[] = [
        {letter:"A", value:2},
        {letter:"A", value:0},
        {letter:"A", value:0},
        {letter:"A", value:0},
        {letter:"A", value:0},
    ]

    const yellowExample:cellValueInterface[] = [
        {letter:"A", value:1},
        {letter:"A", value:0},
        {letter:"A", value:0},
        {letter:"A", value:0},
        {letter:"A", value:0},
    ]

    const dgreyExample:cellValueInterface[] = [
        {letter:"A", value:3},
        {letter:"A", value:0},
        {letter:"A", value:0},
        {letter:"A", value:0},
        {letter:"A", value:0},
    ]

    return (

    <div className='h-screen flex flex-col justify-between gap-1'>
        <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

        <Header pageType="" />

        <main className='h-full flex flex-col items-center gap-2 p-2'>
            <h1 onClick={() => open==="classic" ? setOpen("none") : setOpen("classic")}
            className="w-[50vw] text-center p-3 text-2xl font-semibold bg-greenlight">
                Classic
            </h1>
            <div className={`${open === "classic" ? "h-[50vh]" : "h-0"}
            overflow-hidden transition-all delay-150 duration-500`}>
                <h3 className="text-center">The objective of the game is to guess an unknown 5-letter word.</h3>
                <ul className="flex flex-col items-center">
                    <li>Each guess must be a five-letter word</li>
                    <li>You have 6 guesses in total</li>
                    <li>After each guess, the colour of the tiles change</li>
                </ul>
                <ul className="flex flex-col items-center">
                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {greenExample.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>A is in the word and in the correct spot.</p>
                    </li>
                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {yellowExample.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>A is in the word, but not in the correct spot.</p>
                    </li>
                    <li>
                    <div className="w-[50vh] grid grid-cols-5 gap-1">
                        {dgreyExample.map((val, index) => (
                        <LetterBox
                        key = {index}
                        letter = {val.letter}
                        value = {val.value}
                        />
                    ))}
                    </div>
                    <p>A is not in the word.</p>
                    </li>
                </ul>
            </div>

            <h1 onClick={() => open==="timed" ? setOpen("none") : setOpen("timed")}
            className="w-[50vw] text-center p-3 text-2xl font-semibold bg-yellow-400">
                Timed
            </h1>
            <div className={`${open === "timed" ? "h-[30vh]" : "h-0"}
            overflow-hidden transition-all delay-150 duration-500`}>
                <h3>The goal is to score points by guess as many words as possible in 5 minutes</h3>
                <ul className="flex flex-col items-center">
                    <li>some scoring details presumably</li>
                    <li>to add when implemented</li>
                </ul>
            </div>
        </main>
    </div>
    )
}