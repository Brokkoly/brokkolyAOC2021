import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input10.txt').map(str => str.split(''));

const leftToRight = new Map<string, string>([
    ["(", ")"],
    ["{", "}"],
    ["<", ">"],
    ["[", "]"]
]);

const pointMap = new Map<string, number>([
    [")", 3],
    ["}", 1197],
    [">", 25137],
    ["]", 57]
]);

const pointMap2 = new Map<string, number>([
    [")", 1],
    ["}", 3],
    [">", 4],
    ["]", 2]
]);

const left = '({<[';
const right = ')}>]';

class Stack<T>{
    private storage: T[] = [];
    constructor(private capacity: number = Infinity) { }

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }
    toArray(): T[] {
        return [...this.storage];
    }
}



function Q1(input: string[][]): number {
    let expectNextStack: Stack<string>;
    let score = 0;
    input.forEach(line => {
        expectNextStack = new Stack<string>();

        for (let index = 0; index < line.length; index++) {
            if (left.includes(line[index])) {
                expectNextStack.push(leftToRight.get(line[index])!);
                continue;
            }
            if (line[index] !== expectNextStack.peek()) {

                score += pointMap.get(line[index]) || 0;
                console.log(`Error, expected ${expectNextStack.peek()} but found ${line[index]}`);
                break;
            }
            else {
                expectNextStack.pop();
            }
        }
    });
    return score;

}

function Q2(input: string[][]): number {
    let expectNextStack: Stack<string>;
    let scores: number[] = [];
    input.forEach(line => {
        expectNextStack = new Stack<string>();
        let corrupted = false;
        for (let index = 0; index < line.length; index++) {
            if (left.includes(line[index])) {
                expectNextStack.push(leftToRight.get(line[index])!);
                continue;
            }
            if (line[index] !== expectNextStack.peek()) {
                corrupted = true;
                break;
            }
            else {
                expectNextStack.pop();
            }
        }

        if (!corrupted) {
            let score=0;
            while (expectNextStack.peek()) {
                score *= 5;
                score += pointMap2.get(expectNextStack.pop()!) || 0;

            }
            scores.push(score);
        }
    });
    scores=scores.sort((a,b)=>a-b);
    console.log({scores});

    return scores[Math.floor(scores.length/2)];
}

console.log("Q1:", Q1(input));
console.log("Q2:", Q2(input));