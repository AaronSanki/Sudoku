import React from "react";
import { useGame } from "../../Store/gameStore.js"
function Cell({row, col}) {
    const {qBoard, setSelectedCell, selectedCell, board, isPaused, gameOver, win, darkMode} = useGame()
    function handleClick() {
        if(!isPaused && !gameOver && !win) {
            if(selectedCell.row === row && selectedCell.col === col)
                setSelectedCell(null, null, null)
            else
                setSelectedCell(row, col, Math.floor(row/3)*3+Math.floor(col/3))
        }
    }    
    function isSelected() {
        const query = {current: false, other: false}
        if(selectedCell.row == row && selectedCell.col == col)
            query.current = true
        if(selectedCell.row !== null && !qBoard[selectedCell.row][selectedCell.col].default && qBoard[selectedCell.row][selectedCell.col].value === 0 && (selectedCell.row === row || selectedCell.col === col || selectedCell.square === Math.floor(row/3)*3+Math.floor(col/3)))
            query.other = true;
        else if(selectedCell.row !== null && qBoard[selectedCell.row][selectedCell.col].value !== 0 && qBoard[selectedCell.row][selectedCell.col].value === qBoard[row][col].value)
            query.other = true
        return query
    }
    const selectedStatus = isSelected()
    return (
        <div onClick = {handleClick} className={`cell select-none relative flex items-center justify-center w-full h-full rounded-md 
        ${selectedStatus.current
            ? `${darkMode?"bg-zinc-950":"bg-indigo-200"} ${!qBoard[row][col].default&&`outline outline-[1px] ${darkMode?"outline-blue-800":"outline-black"}`}`
            : selectedStatus.other
                ? `${darkMode?"bg-zinc-950":"bg-indigo-200"} ${!qBoard[row][col].default&&"cursor-pointer"}`
                : qBoard[row][col].default
                    ? `${darkMode?"bg-zinc-900":"bg-blue-300"}`
                    : `${darkMode?"bg-stone-900":"bg-blue-100"} ${!isPaused&&!gameOver&&!win&&`cursor-pointer ${darkMode?"hover:bg-stone-950":"bg-blue-200"} hover:outline hover:outline-[1px]`}`
        }`}>
            {qBoard[row][col].value != 0
            && <span className={`text-2xl md:text-3xl ${qBoard[row][col].default && selectedStatus.other && "text-gray-500"} ${qBoard[row][col].value!=board[row][col] && "text-rose-800"}`}>
                {qBoard[row][col].value}
            </span>}
            {<span className={`text-base md:text-2xl absolute -top-1 right-1 ${darkMode?"text-blue-800":"text-indigo-600"}`}>
                {qBoard[row][col].pencilValue != 0 && qBoard[row][col].pencilValue}
            </span>}
        </div>
    )
}
export default Cell