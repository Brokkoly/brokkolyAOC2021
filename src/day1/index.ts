import * as helpers from '../helpers';


const input = helpers.readInput('../../inputs/input1.txt');
const inputNums = input.map(str => Number.parseInt(str));
const output1 = aocD1Q1(inputNums);
const output2 = aocD1Q1(aocD1Q2(inputNums));
console.log(output1);
console.log(output2);
/**
 * 
 * @param input 
 * @returns 
 */
function aocD1Q1(input: number[]): number {
	console.log(input);
	let numIncreases = 0;
	for (let i = 1; i < input.length; i++) {
		if (input[i] > input[i - 1]) {
			numIncreases++;
		}
	}
	return numIncreases;
}

function aocD1Q2(input: number[]): number[] {
	const windowArr = new Array<number>(input.length - 2);
	for (let i = 1; i < input.length - 1; i++) {
		let sum = input[i - 1] + input[i] + input[i + 1];
		windowArr[i - 1] = sum;
	}
	return windowArr;
}