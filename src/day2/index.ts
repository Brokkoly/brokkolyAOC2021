import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input2.txt');

const validDirections = ["forward", "down", "up"];

interface IDirection {
	direction: ValidDirection;
	magnitude: number;
}
type ValidDirection = "forward" | "down" | "up";
const directions: IDirection[] = input.map(str => {
	const dirAndMagnitude = str.split(" ");
	if (!validDirections.find(dir => dir === dirAndMagnitude[0])) {
		throw new Error("Error: invalid direction")
	}
	return {
		direction: dirAndMagnitude[0] as ValidDirection,
		magnitude: Number.parseInt(dirAndMagnitude[1])
	}
});

function D2Q1(directions: IDirection[]): number {
	let forwardCoordinate = 0;
	let depthCoordinate = 0;
	directions.forEach(direction => {
		if (direction.direction === "forward") {
			forwardCoordinate += direction.magnitude;
		}
		else if (direction.direction === "up") {
			depthCoordinate -= direction.magnitude
		}
		else {
			depthCoordinate += direction.magnitude;
		}
	});
	return forwardCoordinate * depthCoordinate;
}

function D2Q2(directions: IDirection[]): number {
	let forwardCoordinate = 0;
	let depthCoordinate = 0;
	let aim = 0;
	directions.forEach(direction => {
		if (direction.direction === "forward") {
			forwardCoordinate += direction.magnitude;
			depthCoordinate += direction.magnitude * aim;
		}
		else if (direction.direction === "up") {
			aim -= direction.magnitude
		}
		else {
			aim += direction.magnitude;
		}
	});
	return forwardCoordinate * depthCoordinate;
}

console.log(D2Q1(directions));
console.log(D2Q2(directions));