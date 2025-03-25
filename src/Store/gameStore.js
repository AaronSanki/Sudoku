import { create } from 'zustand'
import { MODE, sudoku } from './sudokuUtils'
import { persist } from 'zustand/middleware'

const initialState = {
    isStart: false,
    isPaused: false,
    gameOver: false,
    win: false,
    correctCells: 0,
    pencilMode: false,
    darkMode: localStorage.getItem('darkMode') === "true" ? true : false,
    hints: 0,
    mistakes: 5,
    time: 0,
    highScore: null,
    mode: MODE["easy"],
    freq: Array(10).fill(0),
    nums: Array(10).fill(0),
    board: Array.from({ length: 9 }, () => Array(9).fill(0)),
    qBoard: Array.from({ length: 9 }, () => Array(9).fill(0)),
    selectedCell: { row: null, col: null, square: null },
    timerRef: null
}

const gameState = (set) => ({
    ...initialState,
    startGame: (mode) => {
        const data = sudoku(mode);
        set({
            ...initialState,
            board: data.solvedBoard,
            qBoard: data.unsolvedBoard,
            nums: data.nums,
            freq: data.nums,
            darkMode: localStorage.getItem('darkMode') === "true" ? true : false,
            isStart: true,
            mode: MODE[mode],
            hints: MODE[mode].hints,
            mistakes: MODE[mode].mistakes,
            correctCells: 81-data.hideCells,
            highScore: localStorage.getItem("highScore") ? Number(localStorage.getItem("highScore")) : null,
        })
    },

    pauseGame: () => {
        set((state)=>({...state, isPaused: !state.isPaused}))
    },

    tryAgain: () => {
        set(state => {
            const qBoard = state.qBoard.map(row=>row.map(obj=>{
                if(obj.default)
                    return obj;
                return {default: false, pencilValue: 0, value: 0}
            }))
            return {...state, qBoard, mistakes: state.mode.mistakes, selectedCell: {row: null, col: null, square: null}, hints: state.mode.hints, gameOver: false, isPaused: false, time: 0, nums: state.freq}
        })
    },

    continueGame: () => {
        set((state) => {
            if(localStorage.getItem('game'))
                return JSON.parse(localStorage.getItem('game'))
            return state
        })
    },

    togglePencilMode: () => {
        set((state) => {
            return {...state, pencilMode: !state.pencilMode}
        })
    },

    changeQBoard: (num) => {
        set((state) => {
            const row = state.selectedCell.row;
            const col = state.selectedCell.col;
            if (state.nums[num] > 0 && !state.isPaused && !state.gameOver && row !== null && col !== null && !state.qBoard[row][col].default) {
                const qBoard = state.qBoard.map(row => row.map(cell => ({ ...cell })))
                let mistakes = state.mistakes
                let gameOver = state.gameOver
                let win = state.win
                let correctCells = state.correctCells
                let highScore = state.highScore
                let selectedCell = state.selectedCell
                let nums = [...state.nums]
                if(state.pencilMode) {
                    if(qBoard[row][col].pencilValue === num)
                        num = 0
                    qBoard[row][col] = { ...qBoard[row][col], pencilValue: num }
                }
                else {
                    if(qBoard[row][col].value === num) {
                        num = 0
                        if(state.board[row][col] === qBoard[row][col].value) {
                            correctCells--
                            nums[qBoard[row][col].value]++
                        }
                    }
                    else if(num !== state.board[row][col]) {
                        if(state.board[row][col] === qBoard[row][col].value) {
                            correctCells--
                            nums[qBoard[row][col].value]++
                        }
                        if(mistakes == 0)
                            gameOver = true;
                        else
                            mistakes--;
                    }
                    else {
                        correctCells++;
                        nums[num]--
                    }
                    if (correctCells === 81) {
                        win = true;
                        if (state.time < highScore || highScore === null) {
                            highScore = state.time;
                            localStorage.setItem("highScore", highScore);
                        }
                        selectedCell = {row: null, col: null, square: null}
                    }
                    qBoard[row][col] = { ...qBoard[row][col], value: num, win, correctCells, highScore, nums}
                }
                return { ...state, qBoard, mistakes, gameOver, correctCells, win, highScore, selectedCell, nums};
            }
            return state;
        })
    },

    setSelectedCell: (row, col, square) => {
        set({ selectedCell: { row, col, square } });
    },

    updateTime: () => {
        set((state) => {
            localStorage.setItem('game', JSON.stringify({...state, time: state.time + 1 }))
            return {...state, time: state.time + 1 }
        })
    },

    resetQBoard: () => {
        set((state) => {
            if(!state.gameOver && !state.win && !state.isPaused){
                const qBoard = state.qBoard.map(row => {
                    return row.map(obj=>{
                        if(obj.default)
                            return {...obj, pencilValue: 0}
                        return {...obj, value: 0, pencilValue: 0}
                    })
                })
                const nums = [...state.freq]
                return {...state, qBoard, nums}
            }
            return state
        })
    },

    quitGame: () => {
        set({
            isStart: false
        })
    },

    useHint: () => {
        set((state) => {
            const row = state.selectedCell.row
            const col = state.selectedCell.col
            const qBoard = state.qBoard
            let hints = state.hints
            let win = state.win
            let correctCells = state.correctCells
            let highScore = state.highScore
            let selectedCell = state.selectedCell
            let nums = [...state.nums]
            if(!qBoard[row][col].default && !state.isPaused && !state.gameOver && hints && qBoard[row][col].value != state.board[row][col]) {
                qBoard[row][col] = {...qBoard[row][col], value: state.board[row][col]}
                hints--
                correctCells++
                nums[state.board[row][col]]--
            }
            if (correctCells === 81) {
                win = true;
                if (state.time < highScore || highScore === null) {
                    highScore = state.time;
                    localStorage.setItem("highScore", highScore);
                }
                selectedCell = {row: null, col: null, square: null}
            }
            return {...state, qBoard, hints, correctCells, win, highScore, selectedCell, nums}
        })
    },

    toggleMode: () => {
        set((state) => {
            const newMode = !state.darkMode;
            localStorage.setItem("darkMode", newMode)
            return { ...state, darkMode: newMode };
        })
    },
})

export const useGame = create(persist(gameState, {name: 'board'}));