import * as helpers from '../helpers';
import { Buffer } from 'buffer';

const input = helpers.readInput('../../inputs/input16test.txt');
let inputBinary = '';
for (let i = 0; i < input.length; i++) {
  inputBinary += Number.parseInt(input[i], 16).toString(2).padStart(4,'0');
  console.log(inputBinary);
}
console.log({inputBinary});

interface IPacket {
  version: number;
  type: number;
  contents?: number;
  packets: IPacket[];
}

interface ILiteralPacket extends IPacket {}

interface IOperatorPacket extends IPacket {}

function parsePackets(
  input: string,
  numPackets: number = Infinity
): [IPacket[], string] {
  const packetResults: IPacket[] = [];
  while (input.length > 11 && packetResults.length < numPackets) {
    console.log('loopBegin:', { input });
    let version = Number.parseInt(input.substring(0, 3), 2);

    let type = Number.parseInt(input.substring(3, 6), 2);
    input = input.substring(6);
    console.log({type});
    console.log({version});
    if (type === 4) {
      let result = parseLiteralPacketContents(input);
      input = input.substring(result[1]);
      packetResults.push({
        type: type,
        version: version,
        contents: result[0],
        packets: [],
      });
    } else {
        
      let operatorType = input.charAt(0);
      console.log({operatorType})
      input = input.substring(1);
      switch (operatorType) {
        case '0':
          //operator w/ sub-packets whose length in bits is defined by the next 15 bits in the sequence
          let bitLength = Number.parseInt(input.substring(0, 15), 2);
          let subPacketInput = input.substring(15, bitLength + 15);
          input = input.substring(bitLength + 15);
          packetResults.push({
            type: type,
            version: version,
            packets: parsePackets(subPacketInput)[0],
          });
          
          break;
        case '1':
          let numSubPackets = Number.parseInt(input.substring(0, 11), 2);
          input=input.substring(11);
          let result = parsePackets(input, numSubPackets);
          packetResults.push({
            version: version,
            type: type,
            packets: result[0],
          });
          input = result[1];
          //operator w/ a number of sub-packets defined by the next 11 bits in the sequence
          break;
        default:
          throw new Error('Invalid type id found: ' + type);
      }
    }
  }

  return [packetResults, input];
}

// function parseNewPacket(
//   input: string,
//   currentLocation: number
// ): [IPacket, number] {}

function parseLiteralPacketContents(input: string): [number, number] {
  let currentLocation = 0;
  let endOfPackets = false;
  let numberParts: string[] = [];
  do {
    endOfPackets = input.charAt(currentLocation) === '0';
    numberParts.push(input.substring(currentLocation + 1, currentLocation + 5));
    currentLocation += 5;
  } while (!endOfPackets);
  return [Number.parseInt(numberParts.join(''), 2), currentLocation];
}

// function parseSubPacketsByBitLength(
//   input: string,
//   currentLocation: number,
//   bitsRemaining: number
// ): [IPacket[], number] {
//   let version = Number.parseInt(
//     input.substring(currentLocation, currentLocation + 3),
//     2
//   );
//   currentLocation += 3;
//   let type = Number.parseInt(
//     input.substring(currentLocation, currentLocation + 3),
//     2
//   );

//   currentLocation += 3;
//   let currentPacket = {
//     version: version,
//     type: type,
//   };

// }
function extractFullPacketByBitLength(input: string, bitLength: number) {}

function Q1(input: string): number {
  let packetStack: IPacket[] = parsePackets(input)[0];
  let versionSum = 0;
  while (packetStack.length) {
    let currentPacket = packetStack.pop()!;
    console.log(currentPacket);
    if (currentPacket.type !== 4) {
      packetStack.push(...currentPacket.packets);
    }

    versionSum += currentPacket.version;
  }
  return versionSum;
}

console.log('Q1:', Q1(inputBinary));
