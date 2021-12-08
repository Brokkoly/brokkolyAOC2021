import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input6.txt')[0].split(',');

function advanceDay(input: number[]): number[] {
	let birthing = 0;
	let newFish = new Array<number>(input.length);
	input.forEach((numFish, index) => {
		if (index === 0) {
			birthing = numFish;
		}
		input[index - 1] = numFish;
	});
	input[8] = birthing;
	input[6] += birthing;
	return input;
}

function Q1(input: string[], numDays: number): number {
	let currentFish = new Array<number>(9).fill(0);
	input.forEach(str => {
		currentFish[Number.parseInt(str)]++;
	});
	for (let day = 1; day <= numDays; day++) {
		currentFish = advanceDay(currentFish);
	}
	let numFish = 0;
	currentFish.forEach(eachAge => numFish += eachAge);
	return numFish;
}

console.log("Q1:", Q1(input, 80));
console.log("Q2:", Q1(input, 256));

