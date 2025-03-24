export const MODE = {
    cakeWalk: {
        key: "cakewalk",
        name: "Cake Walk",
        value: [30, 40],
        mistakes: 5,
        hints: 5
    },
    easy: {
        key: "easy",
        name: "Easy",
        value: [40, 50],
        mistakes: 4,
        hints: 4
    },
    medium: {
        key: "medium",
        name: "Medium",
        value: [50, 60],
        mistakes: 3,
        hints: 3
    },
    hard: {
        key: "hard",
        name: "Hard",
        value: [60, 70],
        mistakes: 5,
        hints: 3
    }
}

export function generateRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num || board[row][i] === num) return false;
    }
    let cRow = Math.floor(row / 3) * 3;
    let cCol = Math.floor(col / 3) * 3;
    for (let i = cRow; i < cRow + 3; i++) {
        for (let j = cCol; j < cCol + 3; j++) {
            if (board[i][j] === num) return false;
        }
    }
    return true;
}

export function generateRandomAray() {
    let randomArray = [];
    while (randomArray.length < 9) {
        const num = generateRandom(1, 9);
        if (!randomArray.includes(num)) randomArray.push(num);
    }
    return randomArray
}

function removeCell(board, num) {
    let removed = 0;
    let nums = Array(10).fill(0)
    while (removed < num) {
        const row = generateRandom(0, 8);
        const col = generateRandom(0, 8);
        if (board[row][col] !== 0) {
            nums[board[row][col]]++
            board[row][col] = 0;
            removed++;
        }
    }
    return nums
}

export function generateSudoku(board, i, j) {
    if (i == 9)
        return true
    let randomArray = generateRandomAray()
    for (let num of randomArray) {
        if (isValid(board, i, j, num)) {
            board[i][j] = num
            let nextRow = i
            let nextCol = j+1
            if(nextCol == 9) {
                nextRow++
                nextCol = 0
            }
            if (generateSudoku(board, nextRow, nextCol))
                return true
            board[i][j] = 0
        }
    }
    return false
}
export function sudoku(mode) {
    const hideCells = generateRandom(MODE[mode].value[0], MODE[mode].value[1]);
    let solvedBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    generateSudoku(solvedBoard, 0, 0);
    let unsolvedBoard = solvedBoard.map((row) => row.map((num) => num));
    const nums = removeCell(unsolvedBoard, hideCells);
    unsolvedBoard = unsolvedBoard.map((row) => {
        return row.map((num) => {
            if (num) {
                return { value: num, default: true,pencilValue:0 }
            }
            return { value: num, default: false,pencilValue:0 }
        })
    })
    return { solvedBoard, unsolvedBoard, hideCells, nums }
}