export class BingoBoard {
    board: Array<BingoSpot> = [];
    height: number = 0;
    width: number = 0;
    constructor(board: Array<number>, height: number, width: number) {
        this.board = new Array<BingoSpot>(board.length);
        board.forEach((num, index) => {
            this.board[index] = { num: num, called: false }
        });
        this.height = height;
        this.width = width;
    }
    find(numToFind: number): BingoLocation | undefined {
        let index = this.board.findIndex(spot => spot.num === numToFind);
        // console.log("numToFind:", numToFind);
        // console.log("index:", index);
        if (index === -1) {
            return undefined;
        }
        else {
            let columnIndex = (index) % this.width;
            let rowIndex = (index - columnIndex) / this.width;
            // console.log("rowIndex: ", rowIndex);
            // console.log("columnIndex: ", columnIndex);
            return { columnIndex: columnIndex, rowIndex: rowIndex };
        }
    }
    get(row: number, column: number): BingoSpot {
        return this.board[row * this.width + column];
    }
    findSolvedRow(rowIndex: number): boolean {
        let solved = true;
        for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
            if (!this.get(rowIndex, columnIndex).called) {
                solved = false;
                break;
            }
        }
        return solved;
    }
    findSolvedColumn(columnIndex: number): boolean {
        let solved = true;
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            if (!this.get(rowIndex, columnIndex).called) {
                solved = false;
                break;
            }
        }
        return solved;
    }
    getBingoResult(input: number[]): BingoResult {
        for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
            let spot = this.find(input[inputIndex]);
            if (spot === undefined) {
                continue;
            }
            // console.log("rowIndex: ", spot.rowIndex);
            // console.log("columnIndex: ", spot.columnIndex);
            this.get(spot.rowIndex, spot.columnIndex).called = true;
            if (inputIndex >= 5) {
                //todo: maybe check number of called numbers?
                if (this.findSolvedRow(spot.rowIndex) || this.findSolvedColumn(spot.columnIndex)) {
                    //console.log("winningNumber:",input[inputIndex]);
                    //console.log(this.board);
                    return {
                        turns: inputIndex + 1,
                        score: this.calculateFinalScore() * input[inputIndex]
                    };
                }
            }
        }
        return { turns: -1, score: 0 }
    }
    calculateFinalScore(): number {
        let score = 0;
        this.board.forEach(spot => {
            if (!spot.called) {
                score += spot.num;
            }
        });
        return score;
    }
}

export interface BingoResult {
    score: number,
    turns: number
}
export interface BingoSpot {
    num: number,
    called: boolean
}
export interface BingoLocation {
    rowIndex: number,
    columnIndex: number
}