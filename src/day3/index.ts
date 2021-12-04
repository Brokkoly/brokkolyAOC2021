import * as helpers from '../helpers';

const input = helpers.readInput('../../inputs/input3.txt');

const inputNums = input.map(str => Number.parseInt(str, 2));

// function getMostCommonNums(input: number[], numBits: number): number[]{
// 	let mostCommon=new Array<number>(numBits);
// 	for(let i=numBits-1;i>=0;i--){
// 		let discriminator = 2**i;


// 	}
// }


function getMostCommon(input: string[]): string[] {
	const numlength = input[0].length;
	let mostCommon = new Array<number>(numlength).fill(0); //positive = 1, negative = 0;

	input.forEach(str => {
		for (let i = 0; i < numlength; i++) {
			if (str.charAt(i) === '1') {
				mostCommon[i] += 1;
			}
			else {
				mostCommon[i] -= 1;
			}
		}
	});
	return mostCommon.map((num, index) => {
		if (num >= 0) {
			//leastCommon[index]=0;
			return '1';
		}
		else {
			//leastCommon[index]=1;
			return '0';
		}
	})
}

function Q1(input: string[]): number {
	let mostCommon = getMostCommon(input);


	let leastCommon = mostCommon.map((num) => {
		if (num === '1') {
			return '0';
		}
		else {
			return '1';
		}
	});
	let gamma = parseInt(mostCommon.join(''), 2);
	let epsilon = parseInt(leastCommon.join(''), 2);
	return gamma * epsilon;
}
function Q2(input: string[]): number {
	const inputNums = input.map(str => Number.parseInt(str, 2));

	//let mostCommon = getMostCommon(input);
	//let mostCommonNum = Number.parseInt(mostCommon.join(''), 2);
	// let leastCommon = mostCommon.map((num) => {
	// 	if (num === '1') {
	// 		return '0';
	// 	}
	// 	else {
	// 		return '1';
	// 	}
	// });
	//let leastCommonNum = Number.parseInt(leastCommon.join(''), 2);
	let currentBitO2 = input[0].length - 1;
	let currentO2 = [...input];
	let currentBitCO2 = input[0].length - 1;
	let currentCO2 = [...input];
	do {
		let mostCommon = getMostCommon(currentO2);
		let mostCommonNum = Number.parseInt(mostCommon.join(''),2);
		console.log("Current O2: ", currentO2);
		console.log("CurrentBitO2: ", currentBitO2);
		currentO2 = currentO2.filter(str => {
			if ((Number.parseInt(str,2) & (2 ** currentBitO2)) === (mostCommonNum & (2 ** currentBitO2))) {
				//console.log("matches");
				return true;
			}
			return false;
		})
		currentBitO2--;
	}
	while (currentO2.length > 1 && currentBitO2 >= 0);
	do {
		let mostCommon = getMostCommon(currentCO2);
		let leastCommon = mostCommon.map((num) => {
			if (num === '1') {
				return '0';
			}
			else {
				return '1';
			}
		});
		let leastCommonNum = Number.parseInt(leastCommon.join(''),2);
		console.log("leastCommon: ",leastCommon.join(''));
		console.log("Current CO2: ", currentCO2);
		console.log("CurrentBitCO2: ", currentBitCO2);
		currentCO2 = currentCO2.filter(str => {
			if ((Number.parseInt(str,2) & (2 ** currentBitCO2)) === (leastCommonNum & (2 ** currentBitCO2))) {
				return true;
			}
			return false;
		})
		currentBitCO2--;
	}
	while (currentCO2.length > 1 && currentBitCO2 >= 0)
	console.log(currentO2);
	console.log(currentCO2);

	let O2 = Number.parseInt(currentO2[0],2);
	let CO2 = Number.parseInt(currentCO2[0],2);
	console.log(O2);
	console.log(CO2)
	return O2*CO2;
}


console.log("Q1: ", Q1(input));
console.log(Q2(input));

//console.log(Number.parseInt("11111", 2) ^ Number.parseInt("01000", 2))