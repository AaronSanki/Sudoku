import React, { useEffect, useRef } from "react";
import Board from "../Board/Board.jsx";
import { GButton } from "../Elements/index.js";
import { LogOut, Pause, RotateCcw, Pencil, Lightbulb, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../Store/gameStore.js";
function Game() {
    const navigate = useNavigate();
    const { isStart, isPaused, pauseGame, gameOver, updateTime, quitGame, togglePencilMode, useHint, pencilMode, hints, resetQBoard, win, darkMode } = useGame();
    const timeRef = useRef()
    useEffect(() => {
        if (!isStart)
            navigate("/")
        clearInterval(timeRef.current)
        if(!isPaused && !gameOver && !win) {
            timeRef.current = setInterval(() => {
                updateTime()
            }, 1000)
            return () => clearInterval(timeRef.current)
        }
    }, [isPaused, gameOver, win, updateTime, isStart])

    return (
        <div className="flex flex-col justify-around gap-5 ">
            <Board />
            <div className="flex flex-wrap justify-around">
                <GButton title={<LogOut />} onClick={()=>{quitGame()}} style="p-5"/>
                <GButton title={<RotateCcw />} onClick={()=>{resetQBoard()}} style="p-5"/>
                <GButton title={isPaused?<Play/>:<Pause />} onClick={()=>{pauseGame()}} style="p-5"/>
                <GButton title={<Pencil />} onClick={() => {togglePencilMode()}} condition = {pencilMode} style={`${darkMode?"text-blue-900":"text-violet-500"} p-5`}/>
                <GButton title={<><span className={`absolute h-6 w-6 -right-3 -top-3 flex items-center justify-center text-center text-xl ${darkMode?"bg-gray-900":"bg-indigo-400"} p-3 rounded-full`}>{hints}</span><Lightbulb /></>} onClick={()=>{useHint()}} style="p-5"/>
            </div>
        </div>
    )
}

export default Game;