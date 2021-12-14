import * as helpers from '../helpers';
const input = helpers.readInput('../../inputs/input14.txt');
const template = input[0];
const rules = input.slice(2);
const rulesMap = new Map<string,string>();
rules.forEach(rule=>{
    const splitRule=rule.split(' -> ');
    rulesMap.set(splitRule[0],splitRule[1]);
})

function Q1(template: string, rulesMap: Map<string,string>): number{
    let currentString=template;
    for(let step=0;step<10;step++){
        let newString="";
        for(let i=1;i<currentString.length;i++){
            let elements=currentString.substring(i-1,i+1);
            let toInsert = rulesMap.get(elements) || '';
            newString+=currentString.charAt(i-1)+toInsert;
        }
        currentString=newString+currentString.charAt(currentString.length-1);
        //console.log({currentString});
    }
    let countMap=new Map<string,number>();
    for(let index=0;index<currentString.length;index++){
        countMap.set(currentString.charAt(index),(countMap.get(currentString.charAt(index))||0)+1);
    }
    let leastCommon=Infinity;
    let mostCommon=0;
    countMap.forEach((value,key)=>{
        if(value<leastCommon){
            leastCommon=value;
        }
        if(value>mostCommon){
            mostCommon=value;
        }
    })
    return mostCommon-leastCommon;
}

function calculateNumber(input: string,rulesMap: Map<string,string>, countMap: Map<string,number>, depthToGo: number): void{
    if(depthToGo===0){
        return;
    }
    let toInsert = rulesMap.get(input)||'';
    if(toInsert){
        countMap.set(toInsert,(countMap.get(toInsert)||0)+1);
        calculateNumber(input.charAt(0)+toInsert,rulesMap,countMap,depthToGo-1);
        calculateNumber(toInsert+input.charAt(1),rulesMap,countMap,depthToGo-1);
    }
}



function Q2(template: string, rulesMap: Map<string,string>): number{
    let countMap=new Map<string,number>();
    let totalMap=new Map<string,number>();
    for(let i=0;i<template.length;i++){
        totalMap.set(template.charAt(i),(totalMap.get(template.charAt(i))||0)+1);
    }

    for(let i=1;i<template.length;i++){
        let elements=template.substring(i-1,i+1);
        countMap.set(elements,(countMap.get(elements)||0)+1);
    }
    let newMap: Map<string,number>;
    console.log({countMap});
    for(let i=0;i<40;i++){
        newMap=new Map<string,number>();
        countMap.forEach((value,key)=>{
            const result = rulesMap.get(key)||'';
            totalMap.set(result,(totalMap.get(result)||0)+value);
            const newStrings=key.split('');
            newStrings[0]=newStrings[0]+result;
            newStrings[1]=result+newStrings[1];
            newStrings.forEach(str=>{
                newMap.set(str,(newMap.get(str)||0)+value);
            });
        })
        countMap=newMap;
    }
    let leastCommon=Infinity;
    let mostCommon=0;
    totalMap.forEach((value,key)=>{
        if(value<leastCommon){
            leastCommon=value;
        }
        if(value>mostCommon){
            mostCommon=value;
        }
    })
    return mostCommon-leastCommon;
}

console.log("Q1:",Q1(template,rulesMap));
console.log("Q2:",Q2(template,rulesMap));