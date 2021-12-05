import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input5test.txt');

interface ICoordinate {
	x: number,
	y: number
}
interface ILine {
	pointOne: ICoordinate,
	pointTwo: ICoordinate
}

const lines: ILine[] = input.map(str => {
	const coordString = str.split(' -> ');
	const pointOne = coordString[0].split(',');
	const pointTwo = coordString[1].split(',');
	return {
		pointOne: {
			x: Number.parseInt(pointOne[0]),
			y: Number.parseInt(pointOne[1])
		},
		pointTwo: {
			x: Number.parseInt(pointTwo[0]),
			y: Number.parseInt(pointTwo[1])
		}
	}
})

function Q1(inputLines: ILine[]): number {
	let numIntersections = 0;
	const horizontalLines: ILine[] = [];
	const verticalLines: ILine[] = [];
	let largestX = 0;
	let largestY = 0;
	inputLines.forEach(line => {
		if (line.pointOne.x === line.pointTwo.x) {
			verticalLines.push(line);
		}
		else if (line.pointOne.y === line.pointTwo.y) {
			horizontalLines.push(line);
		}
		if (line.pointOne.x > largestX) {
			largestX = line.pointOne.x;
		}
		if (line.pointTwo.x > largestX) {
			largestX = line.pointTwo.x;
		}
		if (line.pointOne.y > largestY) {
			largestY = line.pointOne.y;
		}
		if (line.pointTwo.y > largestY) {
			largestY = line.pointTwo.y;
		}
	});

	largestX++;
	largestY++;

	const grid = [...Array<Array<number>>(largestY)].map(array => new Array(largestX).fill(0)); //y is the top array, x is the nested. This makes the printing much easier
	horizontalLines.forEach(line => {
		if (line.pointOne.x > line.pointTwo.x) {
			let tempPoint = line.pointOne;
			line.pointOne = line.pointTwo;
			line.pointTwo = tempPoint;
		}
		for (let x = line.pointOne.x; x <= line.pointTwo.x; x++) {
			grid[line.pointOne.y][x]++;
			if (grid[line.pointOne.y][x] === 2) {
				numIntersections++;
			}
		}
	});
	verticalLines.forEach(line => {
		if (line.pointOne.y > line.pointTwo.y) {
			let tempPoint = line.pointOne;
			line.pointOne = line.pointTwo;
			line.pointTwo = tempPoint;
		}
		for (let y = line.pointOne.y; y <= line.pointTwo.y; y++) {
			grid[y][line.pointOne.x]++;

			if (grid[y][line.pointOne.x] === 2) {
				numIntersections++;
			}

		}
	});

	return numIntersections;
}

function Q2(inputLines: ILine[]): number {
	let numIntersections = 0;
	const horizontalOrDiagonalLines: ILine[] = [];
	const verticalLines: ILine[] = [];
	const diagonalLines: ILine[] = [];
	let largestX = 0;
	let largestY = 0;
	inputLines.forEach(line => {
		if (line.pointOne.x === line.pointTwo.x) {
			verticalLines.push(line);
		}
		else {
			horizontalOrDiagonalLines.push(line);
		}
		if (line.pointOne.x > largestX) {
			largestX = line.pointOne.x;
		}
		if (line.pointTwo.x > largestX) {
			largestX = line.pointTwo.x;
		}
		if (line.pointOne.y > largestY) {
			largestY = line.pointOne.y;
		}
		if (line.pointTwo.y > largestY) {
			largestY = line.pointTwo.y;
		}
	});

	largestX++;
	largestY++;
	const grid = [...Array<Array<number>>(largestY)].map(array => new Array(largestX).fill(0));

	// nyeah look at me I'm a vertical line, my slope is infinite
	verticalLines.forEach(line => {
		if (line.pointOne.y > line.pointTwo.y) {
			let tempPoint = line.pointOne;
			line.pointOne = line.pointTwo;
			line.pointTwo = tempPoint;
		}
		for (let y = line.pointOne.y; y <= line.pointTwo.y; y++) {
			grid[y][line.pointOne.x]++;

			if (grid[y][line.pointOne.x] === 2) {
				numIntersections++;
			}

		}
	});
	horizontalOrDiagonalLines.forEach(line => {
		if (line.pointOne.x > line.pointTwo.x) {
			let tempPoint = line.pointOne;
			line.pointOne = line.pointTwo;
			line.pointTwo = tempPoint;
		}

		let slope = (line.pointTwo.y - line.pointOne.y) / (line.pointTwo.x - line.pointOne.x);

		for (let x = line.pointOne.x, y = line.pointOne.y; x <= line.pointTwo.x; x++, y += slope) {
			grid[y][x]++;

			if (grid[y][x] === 2) {
				numIntersections++;
			}

		}
	});

	return numIntersections;
}

console.log("Q1", Q1(lines));
console.log("Q2", Q2(lines));