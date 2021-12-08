import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input7.txt')[0].split(',').map(str => Number.parseInt(str));

/**
 * Gets the max and min of an array of numbers
 * @param input an array of numbers
 * @returns an array of numbers in the form [min,max]
 */
function getMaxAndMinOfNumArray(input: number[]): number[] {
	let max = 0;
	let min = Number.POSITIVE_INFINITY;
	input.forEach(num => {
		if (num > max) {
			max = num;
		}
		if (num < min) {
			min = num;
		}
	});
	return [min, max];

}

function getCostOfMoveToPositionQ1(input: number[], position: number, toBeat: number): number {
	let sum = 0;
	for (let i = 0; i < input.length; i++) {
		sum += Math.abs(position - input[i]);
		if (sum > toBeat) {
			return Number.POSITIVE_INFINITY;
		}
	}
	return sum;
}
function getCostOfMoveToPositionQ2(input: number[], position: number, toBeat: number): number {
	let sum = 0;
	for (let i = 0; i < input.length; i++) {
		let distance = Math.abs(position - input[i]);
		let cost = distance * (distance + 1) / 2;
		sum += cost;
		if (sum > toBeat) {
			return Number.POSITIVE_INFINITY;
		}
	}
	return sum;
}

function Q1(input: number[]): number {
	const minMax = getMaxAndMinOfNumArray(input);
	let leastFuel = Number.POSITIVE_INFINITY;
	for (let i = minMax[0]; i < minMax[1]; i++) {
		let cost = getCostOfMoveToPositionQ1(input, i, leastFuel);
		if (cost < leastFuel) {
			leastFuel = cost;
		}
	}
	return leastFuel;
}
function Q2(input: number[]): number {
	const minMax = getMaxAndMinOfNumArray(input);
	let leastFuel = Number.POSITIVE_INFINITY;
	for (let i = minMax[0]; i < minMax[1]; i++) {
		let cost = getCostOfMoveToPositionQ2(input, i, leastFuel);
		if (cost < leastFuel) {
			leastFuel = cost;
		}
	}
	return leastFuel;
}


console.log("Q1:", Q1(input));
console.log("Q2:", Q2(input));