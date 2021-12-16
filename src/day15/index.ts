import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input15.txt').map(str => str.split(''));

interface INode {
    // label: string;
    nextNeighbors: INode[];
    prevNeighbors?: INode[];
    endNode: boolean;
    risk: number;
    minRiskToReach: number;
    visited: boolean;
}
interface IPath {
    path: INode[];
    totalRisk: number;
}

const inputNodes = new Array<Array<INode>>(input.length);
const unvisitedInput = new Array<INode>();
input.forEach((arr, yindex) => {
    inputNodes[yindex] = new Array<INode>(arr.length);
    arr.forEach((risk, xindex) => {
        inputNodes[yindex][xindex] = {
            risk: Number.parseInt(risk),
            minRiskToReach: (xindex === 0 && yindex === 0) ? 0 : Infinity,
            endNode: (xindex === arr.length - 1 && yindex === input.length - 1) ? true : false,
            nextNeighbors: [],
            prevNeighbors: [],
            visited: false,
            //tentative: Infinity,
        }
        // if(xindex!==0&&yindex!==0){
        unvisitedInput.push(inputNodes[yindex][xindex]);
        // }
    });

});
const inputNodes2 = new Array<Array<INode>>(input.length * 5);
const unvisitedInput2 = new Array<INode>();
input.forEach((arr, yindex) => {
    [0, 1, 2, 3, 4].forEach(ynum => {
        let newYIndex = yindex + input.length * ynum;

        inputNodes2[newYIndex] = new Array<INode>(arr.length * 5);
        arr.forEach((risk, xindex) => {
            [0, 1, 2, 3, 4].forEach(num => {
                let newXIndex = xindex + arr.length * num;
                let newRisk = (Number.parseInt(risk)+(ynum+num))
                inputNodes2[newYIndex][newXIndex] = {
                    risk: newRisk > 9 ? newRisk % 9 : newRisk,
                    minRiskToReach: (newXIndex === 0 && newYIndex === 0 && num === 0) ? 0 : Infinity,
                    endNode: (newXIndex === arr.length - 1 && newYIndex === input.length - 1 && num === 4) ? true : false,
                    nextNeighbors: [],
                    prevNeighbors: [],
                    visited: false,
                    //tentative: Infinity,
                }
                //console.log(inputNodes2[newYIndex][newXIndex].risk);
                // if(xindex!==0&&yindex!==0){
                unvisitedInput2.push(inputNodes2[newYIndex][newXIndex]);
                // }
            })

        });
    });
});
inputNodes.forEach((arr, yindex) => arr.forEach((node, xindex) => {
    if (yindex !== inputNodes.length - 1) { node.nextNeighbors.push(inputNodes[yindex + 1][xindex]) };
    if (yindex !== 0) { node.nextNeighbors?.push(inputNodes[yindex - 1][xindex]) };
    if (xindex !== arr.length - 1) { node.nextNeighbors.push(inputNodes[yindex][xindex + 1]) };
    if (xindex !== 0) { node.nextNeighbors?.push(inputNodes[yindex][xindex - 1]) };
    //if (yindex !== 0) { node.prevNeighbors?.push(inputNodes[yindex - 1][xindex]) };
    //if (xindex !== 0) { node.prevNeighbors?.push(inputNodes[yindex][xindex - 1]) };
}));
inputNodes2.forEach((arr, yindex) => arr.forEach((node, xindex) => {
    if (yindex !== inputNodes2.length - 1) { node.nextNeighbors.push(inputNodes2[yindex + 1][xindex]) };
    if (yindex !== 0) { node.nextNeighbors?.push(inputNodes2[yindex - 1][xindex]) };
    if (xindex !== arr.length - 1) { node.nextNeighbors.push(inputNodes2[yindex][xindex + 1]) };
    if (xindex !== 0) { node.nextNeighbors?.push(inputNodes2[yindex][xindex - 1]) };
    //if (yindex !== 0) { node.prevNeighbors?.push(inputNodes[yindex - 1][xindex]) };
    //if (xindex !== 0) { node.prevNeighbors?.push(inputNodes[yindex][xindex - 1]) };
}));

function Q1(input: INode[]): number {
    let unvisited = [...input];
    let currentNode: INode;
    do {
        //console.log(unvisited.length);
        currentNode = unvisited.reduce((prevMinNode, currentNode) => currentNode.minRiskToReach < prevMinNode.minRiskToReach ? currentNode : prevMinNode);
        currentNode.nextNeighbors.forEach(node => {
            if (!node.visited) {
                let tentative = node.risk + currentNode.minRiskToReach;
                if (tentative < node.minRiskToReach) {
                    node.minRiskToReach = tentative;
                }
            }
        });
        currentNode.visited = true;
        //console.log(currentNode.nextNeighbors.length)
        unvisited.splice(unvisited.indexOf(currentNode), 1);
    } while (!currentNode!.endNode && unvisited.length)
    return currentNode.minRiskToReach;
}


console.log("Q1:", Q1(unvisitedInput));

console.log("Q2:", Q1(unvisitedInput2));