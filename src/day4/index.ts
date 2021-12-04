import * as helpers from '../helpers';
import { BingoBoard, BingoResult } from './bingoBoard';
const input = helpers.readInput('../../inputs/input4.txt');
input.push('');
const bingoInput = input[0].split(',').map(str => Number.parseInt(str));

let currentBoard = new Array<number>();
let currentBoards = new Array<BingoBoard>();
let currentHeight = 0;
for (let i = 2; i < input.length; i++) {
    let row = input[i].split(' ').filter(str => !!str).map(str => Number.parseInt(str));
    console.log(row);
    if (!input[i]) {
        //space between boards
        let width = currentBoard.length / currentHeight;
        currentBoards.push(new BingoBoard(currentBoard, currentHeight, width));
        currentBoard = new Array<number>();
        currentHeight = 0;
    }
    else {
        currentHeight++;
        currentBoard.push(...row);
    }
}

console.log(currentBoards.length);
let currentBest: number = 0;
let newBingoInput = [...bingoInput];
currentBoards.forEach(board => {
    let result = board.getBingoResult(newBingoInput);
    console.log(result);
    if (result.turns !== -1) {
        //faster than current best
        currentBest = result.score;
        newBingoInput = newBingoInput.slice(0, result.turns);
    }
});


console.log("Q1:", currentBest || 0);

let results = currentBoards.map(board => board.getBingoResult(bingoInput));
let longest = { turns: 0, score: 0 };
results.forEach(result => {
    if (result.turns > longest.turns) {
        longest = result;
    }
});
console.log("Q2:",longest.score);