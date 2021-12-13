import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input12.txt').map(str => str.split('-'));

interface INode {
    label: string;
    neighbors: INode[];
    endNode: boolean;
    small: boolean;
}
const nodes = new Map<string, INode>();

let startNode: INode = { label: 'start', neighbors: [], endNode: false, small: true };
input.forEach(arr => {
    arr.forEach(label => {
        if (!nodes.has(label)) {
            nodes.set(label, { label: label, neighbors: [], endNode: label === 'end', small: label === label.toLowerCase() || label === 'start' });
        }
        if (label === 'start') {
            startNode = nodes.get('start')!;
        }
    });
});

input.forEach(arr => {
    let firstNode = nodes.get(arr[0])!;
    let secondNode = nodes.get(arr[1])!;
    if (!firstNode.neighbors.includes(secondNode)) {
        firstNode.neighbors.push(secondNode);

    }
    if (!secondNode.neighbors.includes(firstNode)) {
        secondNode.neighbors.push(firstNode);
    }
})

function Q1(startNode: INode): number {
    let paths: INode[][] = [[startNode]];
    while (!allDone(paths)) {
        // paths.forEach(path => {
        //     console.log(path.map(node => node.label).join('->'));
        // });
        let newPaths: INode[][] = [];
        paths.forEach(path => {
            let lastNode = path[path.length - 1];
            //console.log({ lastNode });
            if (lastNode.label === 'end') {
                newPaths.push(path);
                //console.log('finished');
                return;
            }
            //console.log(lastNode.neighbors.length);
            lastNode.neighbors.forEach(node => {
                if (node.small && path.includes(node)) {
                    //console.log(node);
                    return;
                }
                newPaths.push([...path, node]);
            });
        });
        paths = [...newPaths];
    }
    // paths.forEach(path => {
    //     console.log(path.map(node => node.label).join('->'));
    // });
    return paths.length;
}

function allDone(paths: INode[][]): boolean {
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].find(node => node.label === 'end') === undefined) {
            return false;
        }
    }
    return true;
}

function Q2(startNode: INode): number {
    let paths: INode[][] = [[startNode]];
    while (!allDone(paths)) {
        // paths.forEach(path => {
        //     console.log(path.map(node => node.label).join('->'));
        // });
        let newPaths: INode[][] = [];
        paths.forEach(path => {
            let lastNode = path[path.length - 1];
            //console.log({ lastNode });
            if (lastNode.label === 'end') {
                newPaths.push(path);
                //console.log('finished');
                return;
            }
            //console.log(lastNode.neighbors.length);
            lastNode.neighbors.forEach(node => {
                if (node.label === 'start' || (node.small && !checkSmallCaves(path, node))) {
                    return;
                }
                newPaths.push([...path, node]);
            });
        });
        paths = [...newPaths];
    }
    // paths.forEach(path => {
    //     console.log(path.map(node => node.label).join('->'));
    // });
    return paths.length;
}

function checkSmallCaves(input: INode[], inputNode: INode): boolean {
    let smalls = new Map<string, number>();
    let duplicate: INode | undefined;
    input.forEach(node => {
        if (!node.small) {
            return;
        }
        if (!smalls.has(node.label)) {
            smalls.set(node.label, 1);
        }
        else {
            smalls.set(node.label, 2);
            duplicate = node;
        }
    });
    if (!smalls.has(inputNode.label)) {
        return true;
    }
    if (duplicate !== undefined) {
        return false;
    }
    else {
        //allowed to duplicate
        return true;
    }

}

console.log("Q1:", Q1(startNode!));
console.log("Q2:", Q2(startNode!));
//console.log(allDone([[startNode]]))