import React from "react";
import GButton from "./GButton";
import { useGame } from "../../Store/gameStore";
import {MoonStar, Sun} from "lucide-react"
function Theme() {
    const {darkMode, toggleMode} = useGame()
    return(
        <div className="absolute top-4 right-4 z-50 pointer-events-auto">
            <GButton title={darkMode?<Sun/>:<MoonStar/>} onClick={()=>{toggleMode()}} style="p-2"/>
        </div>
    )
}
export default Theme