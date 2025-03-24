import React from "react";
import Cell from "./Cell";

function Square({ row, col }) {
    const squares = Array(3).fill(Array(3).fill(null))

    return (
        <div className="box w-full h-full gap-1 flex flex-col">
            {squares.map((arr, i) => (
                <div key = {i} className="flex gap-1 full h-full">
                    {arr.map((_, j) =>(
                        <Cell key = {j} row = {row*3+i} col = {col*3+j}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Square;
