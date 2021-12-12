import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input9.txt');
const height = input.length;
const width = input[0].length;
const inputOneArr = input.join('').split('');
console.log(input);

console.log(input.map(row => row.split('').map(str => {
	if (str === '9') {
		return ' ';
	}
	return str;
}).join('')))

class HeightMap {
	width: number = 0;
	height: number = 0;
	arr: number[][] = [];
	constructor(arr: number[][]) {
		this.width = arr[0].length;
		this.height = arr.length;
		this.arr = arr;


	}

	get(row: number, column: number): number {
		if (row < 0 || column < 0 || row >= this.width || column >= this.height) {
			return -1;
		}
		return this.arr[column][row];
	}
}

function Q1(input: string[], height: number, width: number): number {
	let sumRisk = 0;
	//let heightMap = new HeightMap(width, height, input);
	console.log({ height });
	console.log({ width });
	let possibleIndices: number[] = [];

	const lowPoints = getLowPoints(input, height, width);
	//console.log({ lowPoints });
	lowPoints.forEach(index => sumRisk += (Number.parseInt(input[index]) + 1));

	return sumRisk;
}

function Q2(input: string[], height: number, width: number): number {
	const lowPoints = getLowPoints(input, height, width);
	const sizes: number[] = [];
	const inputChecked: [string, boolean][] = input.map(str => [str, false]);

	lowPoints.forEach(index => {
		let nextPoints: number[] = [index];
		let numPoints = 0;
		//console.log({ nextPoints });
		while (nextPoints.length) {
			let currentIndex = nextPoints.pop()!;
			numPoints++;
			// console.log({ currentIndex })
			// console.log(inputChecked[currentIndex][0])
			// console.log(!inputChecked[currentIndex][1])
			const nextIndices = getNextIndices(inputChecked, currentIndex, height, width).filter(index=>!nextPoints.includes(index));

			nextPoints.push(...nextIndices);
			inputChecked[currentIndex][1] = true;

			//console.log({ nextPoints });
		}
		sizes.push(numPoints);
	})
	console.log({ lowPoints })
	console.log({ sizes });
	let total = 1;
	let sortedSizes = sizes.sort((a,b)=>b-a);
	console.log({ sortedSizes });
	for (let i = 0; i < 3; i++) {
		total *= sortedSizes[i];
	}
	return total;
}

function getNextIndices(input: [string, boolean][], index: number, height: number, width: number): number[] {
	const retNums: number[] = [];
	if (index % width !== 0) {
		//not left side
		//console.log("previous:", input[index - 1])
		retNums.push(index - 1);
	}
	if (index % width !== width - 1) {
		//not right side
		//console.log("after:", input[index + 1])
		retNums.push(index + 1)
	}
	if (index >= width) {
		//not top side
		retNums.push(index - width)
	}
	if (index < width * (height - 1)) {
		//not right side
		retNums.push(index + width)
	}
	return retNums.filter(index => input[index][0] !== '9' && !input[index][1]);
}



function getLowPoints(input: string[], height: number, width: number): number[] {
	let possibleIndices: number[] = [];

	input.forEach((num, index) => {
		let possible = true;
		//console.log({ num });
		if (index % width !== 0) {
			//not left side
			//console.log("previous:", input[index - 1])
			if (num >= input[index - 1]) {
				possible = false;
			}
		}
		if (index % width !== width - 1) {
			//not right side
			//console.log("after:", input[index + 1])
			if (num >= input[index + 1]) {
				possible = false;
			}
		}
		//console.log({ possible });
		if (possible) {
			possibleIndices.push(index);
		}
	})
	//console.log({ possibleIndices });

	let lowPoints: number[] = [];
	possibleIndices.forEach((index) => {
		let possible = true;
		let num = input[index];
		if (index >= width) {
			//not top side
			if (num >= input[index - width]) {
				possible = false;
			}
		}
		if (index < width * (height - 1)) {
			//not right side
			if (num >= input[index + width]) {
				possible = false;
			}
		}
		if (possible) {
			lowPoints.push(index);
		}
	});
	//console.log({ lowPoints });
	return lowPoints;
}


console.log("Q1:", Q1(inputOneArr, height, width));
console.log("Q2:", Q2(inputOneArr, height, width));