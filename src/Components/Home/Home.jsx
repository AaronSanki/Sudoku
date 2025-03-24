import React from "react";
import { useGame } from "../../Store/gameStore.js";
import { GButton } from "../Elements/index.js";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Home() {
    const { startGame, continueGame, win, darkMode } = useGame()
    const navigate = useNavigate()
    const modeRef = useRef(null)

    function handleStart() {
        startGame(modeRef.current.value);
        localStorage.setItem("mode", modeRef.current.value)
        navigate('/game')
    }
    function handleContinue() {
        if(win === false) {
            continueGame()
            navigate('/game')
        }
    }
    return (
        <div className="flex flex-col flex-wrap justify-evenly h-screen py-10">
            <div id='heading' className='text-8xl font-bold text-center'>$UDOKU</div>
            <div className="flex flex-col items-center justify-center gap-5">
                <GButton onClick={handleStart} title="New Game" style="p-5"/>
                <GButton onClick = {handleContinue} title="Continue" style="p-5"/>
                <label htmlFor="mode" className="text-2xl">Difficulty: </label>
                <select id="mode" defaultValue="easy" ref={modeRef} className={`text-4xl cursor-pointer text-center ${darkMode?"bg-stone-900":"bg-neutral-400"} p-3 rounded-md ${darkMode?"hover:bg-stone-950":"hover:bg-neutral-500"} active:scale-90`}>
                    <option value="cakeWalk">Cake walk</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        </div>
    )
}

export default Home