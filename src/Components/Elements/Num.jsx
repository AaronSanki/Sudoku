import React from "react";
import { useGame } from "../../Store/gameStore";
import { Check } from 'lucide-react';
function Num({ title, onClick }) {
    const { isPaused, gameOver, win, darkMode, nums } = useGame()
    return (
        <button onClick={onClick} className={`text-2xl ${darkMode?`${nums[title]?"bg-gray-900":"bg-gray-950"}`:`${nums[title]?"bg-indigo-400":"bg-indigo-300"}`} p-3 rounded-md ${!isPaused&&!gameOver&&!win&&nums[title]&&"cursor-pointer active:scale-90 hover:outline"}`}>{nums[title]?title:<span className="inline-block w-[0.8ch]"><Check size={20}/></span>}</button>
    )
}

export default Num;
