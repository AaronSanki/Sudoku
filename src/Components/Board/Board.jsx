import React from "react";
import Square from "./Square";
import { GButton, Num } from "../Elements/index.js";
import { useGame } from "../../Store/gameStore.js";
function Board() {
    const square = Array(3).fill(Array(3).fill(null));
    const numbers = Array(9).fill(null);
    const { changeQBoard, isPaused, gameOver, mistakes, mode, time, startGame, tryAgain, highScore, win, darkMode } = useGame();
    function formatTime(seconds) {
        seconds = Math.max(0, Math.floor(seconds));
        const hrs = Math.floor(seconds / 3600);
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return hrs > 0 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`;
    }
    return (
        <div className="flex flex-col gap-5 items-center">
            <div className="flex justify-around text-xl w-full">
                { win ? (
                    <>
                        <p className={`${darkMode?"text-green-500":"text-green-600"} font-semibold`}>Congratulations! You Won.</p> 
                        {time===highScore ? (
                            <p>New High Score: <span>{formatTime(highScore)}</span></p> 
                        ) : (
                            <>
                                <p>Score: <span>{formatTime(time)}</span></p>
                                <p>High Score: <span>{formatTime(highScore)}</span></p>
                            </>
                        )}
                    </> 
                ) : (
                    <>
                        <p>Mode: <span>{mode.name}</span></p>
                        <p>Mistakes left: <span>{mistakes}</span></p>
                        <p>Time: <span>{formatTime(time)}</span></p>
                    </>
                )}
            </div>
            <div className="flex w-screen h-[50vh] md:w-[600px] md:h-[600px] p-2 flex-col gap-2 relative justify-around">
                {isPaused && (
                    <span className={`${darkMode?"bg-stone-800":"bg-gray-100"} text-6xl w-full z-10 border shadow-lg border-black p-16 rounded-xl 
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center`}>
                        Paused
                    </span>
                )}
                {gameOver && (
                    <div className={`text-4xl w-full ${darkMode?"bg-stone-800":"bg-gray-100"} border z-10 shadow-lg border-black p-10 rounded-xl 
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-6 flex flex-col items-center gap-6`}>
                        <span className={`${darkMode?"text-red-500":"text-red-600"} font-semibold`}>Game Over!</span>
                        <div className="flex items-center p-5 justify-around gap-6">
                            <GButton title="Try Again" onClick={()=>{tryAgain()}} style="p-3"/>
                            <GButton title="Start New Game" onClick={()=>{startGame(mode.key)}} style="p-3"/>
                        </div>
                    </div>
                )}
                {square.map((arr, row) => (
                    <div key={row} className="flex gap-2 w-full h-full">
                        {arr.map((_, col) => (
                            <Square key={col} row={row} col={col} />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex justify-around select-none w-full">
                {numbers.map((_, num) => (
                    <Num onClick={() => changeQBoard(num + 1)} key={num} title={num + 1} />
                ))}
            </div>
        </div>
    )
}

export default Board