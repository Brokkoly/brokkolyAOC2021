import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input13.txt');
const folds = input.slice(input.findIndex(str=>str.includes('fold'))).map(str=>{
    let split = str.split('=');
    console.log(split);
    return{
        along: split[0].includes('x')?'x':'y',
        coordinate: Number.parseInt(split[1])
    }
});
console.log({folds});
let coords=input.slice(0,input.findIndex(str=>str.includes('fold'))-1).map(str=>str.split(',').map(strNum=>Number.parseInt(strNum)));
console.log({coords});

interface IFold{
    along: string;
    coordinate: number;
}


function doFold(coordinates: number[], folds: IFold|IFold[]): number[]{
    if(!Array.isArray(folds)){
        folds=[folds];
    }
    let retCoords:number[]=[...coordinates];
    folds.forEach(fold=>{
        if(fold.along==='x'){
            retCoords = [foldCoord(coordinates[0],fold.coordinate),coordinates[1]];
        }
        else{
            retCoords= [coordinates[0],foldCoord(coordinates[1],fold.coordinate)];
        }
    })
    return retCoords;   
}

function foldCoord(coordinate: number, foldLine: number): number{
    if(coordinate<foldLine){
        return coordinate;
    }
    return foldLine*2-coordinate;
}
function Q1(coords: number[][],folds: IFold[]): number{
    let newCoords=coords.map(coord=>doFold(coord,folds[0]));
    let checkMap = new Map<string,number>();
    //console.log({newCoords});
    newCoords.forEach(coord=>checkMap.set(coord.join(),1));
    //console.log({checkMap});

    return checkMap.size;

}

function print(coords: Map<string,number>): void{
    let maxX=0;
    let maxY=0;
    let coordNums: number[][] =[];
    
      coords.forEach((value,key)=>{
        const nums=key.split(',').map(str=>Number.parseInt(str));
        if(nums[0]>maxX){
            maxX=nums[0];
        }
        if(nums[1]>maxY){
            maxY=nums[1];
        }
        coordNums.push(nums);
    })
    
    let arr=new Array<Array<string>>(maxY+1).fill([]);
    
    arr = arr.map(temp=>new Array<string>(maxX+1).fill('.'));
    
    
    
    coordNums.forEach(xy=>{
        console.log({xy});
     arr[xy[1]][xy[0]]='#';   
    });
    
    arr.forEach(line=>console.log(line.join('')));


}
function Q2(coords: number[][],folds: IFold[]):void{
    let newCoords= [...coords];
    console.log(newCoords.length);
    folds.forEach(fold=>{
        newCoords=newCoords.map(coord=>doFold(coord,fold));
    })
    let checkMap = new Map<string,number>();
    //console.log({newCoords});
    newCoords.forEach(coord=>checkMap.set(coord.join(),1));
    //console.log({checkMap});
    console.log(newCoords.length);
    print(checkMap);

}
console.log("Q1:",Q1(coords,folds));
console.log("Q2:")
Q2(coords,folds)

