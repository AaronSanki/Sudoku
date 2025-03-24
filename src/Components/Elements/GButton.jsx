import React from "react";
import { useGame } from "../../Store/gameStore";
function GButton({ title, onClick, condition = true, style = ""}) {
    const { darkMode } = useGame()
    return (
        <button className={`text-4xl cursor-pointer rounded-md ${darkMode?"bg-stone-900":"bg-neutral-400"} ${darkMode?"hover:bg-stone-950":"hover:bg-neutral-500"} active:scale-90 relative ${condition?style:"p-5"}`} onClick={onClick}>{title}</button>
    )
}
export default GButton