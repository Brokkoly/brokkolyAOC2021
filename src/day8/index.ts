import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input8.txt');

// 0:      1:      2:      3:      4:
// aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
// ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
// gggg    ....    gggg    gggg    ....

//  5:      6:      7:      8:      9:
// aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
// dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
// gggg    gggg    ....    gggg    gggg

enum numSegments {
	zero = 6,
	one = 2,
	two = 5,
	three = 5,
	four = 4,
	five = 5,
	six = 6,
	seven = 3,
	eight = 7,
	nine = 6
}

let digitToNumMap = new Map<number, number>([
	[1, 2],
	[4, 4],
	[7, 3],
	[8, 7]
]);

const signals = new Array<Array<string>>(input.length);
const outputs = new Array<Array<string>>(input.length);
input.forEach((val, index) => {
	const inputOutput = val.split(' | ');
	signals[index] = inputOutput[0].split(' ');
	outputs[index] = inputOutput[1].split(' ');
});

function Q1(signals: Array<Array<string>>, outputs: Array<Array<string>>): number {
	let num1478 = 0;
	let nums = [...digitToNumMap.values()];
	outputs.forEach(outputRow => {
		outputRow.forEach(value => {
			if (nums.find(num => num === value.length)) {
				num1478++;
			}
		});
	});
	return num1478;
}

function Q2(signals: Array<Array<string>>, outputs: Array<Array<string>>): number {
	let sum = 0;
	for (let index = 0; index < outputs.length; index++) {
		console.log(signals[index]);
		console.log(outputs[index]);

		let uniqueSignals = getUniqueValues([...signals[index], ...outputs[index]]);

		let correctLayout: string[] = new Array<string>(7).fill("");
		let pattern: string[] = new Array<string>(10).fill("");
		pattern[1] = uniqueSignals.find(str => str.length === 2) || "";
		pattern[4] = uniqueSignals.find(str => str.length === 4) || "";
		pattern[7] = uniqueSignals.find(str => str.length === 3) || "";
		pattern[8] = uniqueSignals.find(str => str.length === 7) || "";

		//find top
		pattern[7].split('').forEach(letter => {
			if (!pattern[1].includes(letter)) {
				correctLayout[0] = letter;
			}
		});
		// find middle
		let possible = pattern[4].split('').filter(letter => !pattern[1].includes(letter));

		let fiveLength = uniqueSignals.filter(signal => signal.length === 5);
		let sixLength = uniqueSignals.filter(signal => signal.length === 6);
		for (let i = 0; i < fiveLength.length; i++) {
			if (!fiveLength[i].includes(possible[0])) {
				correctLayout[1] = possible[0];
				correctLayout[3] = possible[1];
			}
			if (!fiveLength[i].includes(possible[1])) {
				correctLayout[1] = possible[1];
				correctLayout[3] = possible[0];
			}
		}
		console.log({ correctLayout });
		console.log({ fiveLength });
		console.log({ sixLength });
		pattern[0] = sixLength.find(str => !str.includes(correctLayout[3])) || "";
		pattern[5] = fiveLength.find(str => str.includes(correctLayout[1])) || "";
		pattern[3] = fiveLength.find(str => str.includes(pattern[1][0]) && str.includes(pattern[1][1])) || "";
		pattern[2] = fiveLength.find(str => !pattern.includes(str)) || "";
		pattern[9] = sixLength.find(str => str.includes(pattern[1][0]) && str.includes(pattern[1][1]) && str.includes(correctLayout[3])) || ""
		pattern[6] = sixLength.find(str => !pattern.includes(str)) || "";
		//console.log({ correctLayout });
		console.log({ pattern });
		let numberMap = new Map(pattern.map((str, index) => [str, index]));
		console.log({ numberMap });
		console.log(outputs[index]);
		let output = outputs[index].map(str => numberMap.get(sortString(str))?.toString()).join('');
		console.log({ output });
		sum += Number.parseInt(output);
	}

	return sum;
}

function sortString(str: string): string {
	return str.split('').sort().join('');
}

function getUniqueValues(values: string[]): string[] {
	let retArr: string[] = [];
	values.forEach(str => {
		let sorted = sortString(str);
		if (!retArr.includes(sorted)) {
			retArr.push(sorted);
		}
	})
	return retArr;
}



// let oneSignal = "";
// let fourSignal = "";
// let sevenSignal = "";
// let eightSignal = "";
// let uniqueSignals: string[] = [];
// let nums = [...digitToNumMap.values()];






// for (let outputIndex = 0; outputIndex < outputs.length; outputIndex++) {
// 	outputs[outputIndex].forEach(element => {
// 		let sorted = element.split('').sort().join('');
// 		uniqueSignals.push(sorted);

// 	});
// 	if (uniqueSignals.length === 10) {
// 		break;
// 	}
// }
// console.log({ uniqueSignals })


// let correctLayout: string[] = new Array<string>(7).fill("");
// let pattern: string[] = new Array<string>(10).fill("");
// pattern[1] = uniqueSignals.find(str => str.length === 2) || "";
// pattern[4] = uniqueSignals.find(str => str.length === 4) || "";
// pattern[7] = uniqueSignals.find(str => str.length === 3) || "";
// pattern[8] = uniqueSignals.find(str => str.length === 7) || "";

// //find top
// pattern[7].split('').forEach(letter => {
// 	if (!pattern[1].includes(letter)) {
// 		correctLayout[0] = letter;
// 	}
// });
// // find middle
// let possible = pattern[4].split('').filter(letter => !pattern[1].includes(letter));

// let fiveLength = uniqueSignals.filter(signal => signal.length === 5);
// let sixLength = uniqueSignals.filter(signal => signal.length === 6);
// for (let i = 0; i < fiveLength.length; i++) {
// 	if (!fiveLength[i].includes(possible[0])) {
// 		correctLayout[1] = possible[0];
// 		correctLayout[3] = possible[1];
// 	}
// 	if (!fiveLength[i].includes(possible[1])) {
// 		correctLayout[1] = possible[1];
// 		correctLayout[3] = possible[0];
// 	}
// }

// pattern[0] = sixLength.find(str => !str.includes(correctLayout[3])) || "";
// pattern[5] = fiveLength.find(str => str.includes(correctLayout[1])) || "";
// pattern[3] = fiveLength.find(str => str.includes(pattern[1][0]) && str.includes(pattern[1][1])) || "";
// pattern[2] = fiveLength.find(str => !pattern.includes(str)) || "";
// pattern[9] = fiveLength.find(str => str.includes(pattern[1][0]) && str.includes(pattern[1][1]) && str.includes(correctLayout[3])) || ""
// pattern[6] = sixLength.find(str => !pattern.includes(str)) || "";
// console.log({ correctLayout });
// console.log({ pattern });
// let numberMap = new Map(pattern.map((str, index) => [str, index]));
// console.log({ numberMap });




console.log("Q1:", Q1(signals, outputs));
console.log("Q2:", Q2(signals, outputs));