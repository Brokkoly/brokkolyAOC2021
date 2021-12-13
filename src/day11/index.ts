import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input11.txt').map(str => str.split(''));



interface IOctopus {
    energy: number;
    neighbors: IOctopus[];
    flashedThisStep: boolean;
    flash(): void;
    reset(): void;
    checkFlash(): void;
    numFlashes: number;
    increment(): void;
}

class Octopus implements IOctopus {
    flash(): void {
        this.numFlashes++;
        this.flashedThisStep = true;
        this.neighbors.forEach(octopus => {
            octopus.increment();
            octopus.checkFlash()
        });
    }

    energy: number;
    neighbors: IOctopus[] = [];
    flashedThisStep: boolean = false;
    numFlashes = 0;
    constructor(energy: number) {
        this.energy = energy;
    }
    increment(): void {
        if (this.energy <= 9) {
            this.energy++;
        }

    }
    checkFlash(): void {
        if (this.energy > 9 && !this.flashedThisStep) {
            this.flash();
        }
    }
    reset(): void {
        if (this.flashedThisStep) {
            this.flashedThisStep = false;
            this.energy = 0;
        }
    }
}

const inputOctopuses = input.map(arr => arr.map(str => {
    let num = Number.parseInt(str);
    return new Octopus(num);
}));

for (let y = 0; y < inputOctopuses.length; y++) {
    for (let x = 0; x < inputOctopuses[y].length; x++) {
        for (let y0 = y - 1; y0 <= y + 1; y0++) {
            if (y0 < 0 || y0 >= inputOctopuses.length) {
                continue;
            }
            for (let x0 = x - 1; x0 <= x + 1; x0++) {
                if (x0 < 0 || x0 >= inputOctopuses[y].length || (x0 === x && y0 === y)) {
                    continue;
                }
                inputOctopuses[y][x].neighbors.push(inputOctopuses[y0][x0]);
            }
        }
        //console.log(inputOctopuses[y][x].neighbors.length);
    }
}



function Q1(input: IOctopus[][]): number {
    let sum = 0;

    //input.forEach(arr => console.log(arr.map(octopus => octopus.energy).join('')));
    console.log();
    //input.forEach(arr => arr.forEach(octopus => octopus.checkFlash()));
    //input.forEach(arr => console.log(arr.map(octopus => octopus.energy).join('')));
    console.log();

    //input[1][1].flash()

    for (let i = 1; i < 10000; i++) {

        input.forEach(arr => arr.forEach(octopus => {
            octopus.increment();
        }));

        input.forEach(arr => arr.forEach(octopus => octopus.checkFlash()));
        input.forEach(arr => arr.forEach(octopus => {
            octopus.reset();
        }));
        let synchronized = true;
        for (let j = 0; j < input.length; j++) {
            for (let k = 0; k < input[j].length; k++) {
                if (input[j][k].energy !== 0) {
                    synchronized = false;
                    break;
                }
            }
            if (!synchronized) {
                break;
            }
        }
        if (synchronized) {
            console.log("Q2", i);
            input.forEach(arr => console.log(arr.map(octopus => octopus.energy).join('')));
            return i;
        }
        //input.forEach(arr => console.log(arr.map(octopus => octopus.energy).join('')));
        //console.log();

    }


    input.forEach(arr => arr.forEach(octopus => sum += octopus.numFlashes));


    return sum;
}

function Q2(input: IOctopus[][]): number {
    console.log();
    //input.forEach(arr => arr.forEach(octopus => octopus.checkFlash()));
    //input.forEach(arr => console.log(arr.map(octopus => octopus.energy).join('')));
    console.log();

    //input[1][1].flash()

    for (let i = 0; i < 500; i++) {

        let synchronized = true;
        for (let j = 0; j < input.length; j++) {
            for (let k = 0; k < input[j].length; k++) {
                if (input[j][k].energy !== 0) {
                    synchronized = false;
                    break;
                }
            }
            if (!synchronized) {
                break;
            }
        }
        if (synchronized) {
            input.forEach(arr => console.log(arr.map(octopus => octopus.energy).join('')));
            return i;
        }
        input.forEach(arr => arr.forEach(octopus => {
            octopus.increment();
        }));

        input.forEach(arr => arr.forEach(octopus => octopus.checkFlash()));
        input.forEach(arr => arr.forEach(octopus => {
            octopus.reset();
        }));



        //input.forEach(arr => console.log(arr.map(octopus => octopus.energy).join('')));
        //console.log();

    }

    return -1;
}
console.log("Q1:", Q1(inputOctopuses));
console.log("Q2:", Q2(inputOctopuses));