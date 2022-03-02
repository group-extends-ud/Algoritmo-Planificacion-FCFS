import { useFCFSSolver } from './firstComeSolver';

export const useSJFSolver = ():void => {
    console.log("Algoritmo SJF");
    useFCFSSolver();
}

export const usePrioritySolver = ():void => {
    console.log("Algoritmo Priority");
    useFCFSSolver();
}