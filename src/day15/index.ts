import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input15test.txt').map(str=>str.split(''));

interface INode {
    label: string;
    neighbors: INode[];
    endNode: boolean;
    risk: number;
    minRiskToReach: number;
}

let inputNodes = input.forEach((arr, yindex)=>{
    arr.forEach((risk,xindex)=>{
        
    })
})

function Q1(input: INode[][]): number{
    
}