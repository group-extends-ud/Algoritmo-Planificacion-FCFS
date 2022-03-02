import { useFCFSSolver } from './firstComeSolver';
import { groupBy } from 'util/processUtil';
import { useAppSelector, /*useAppDispatch*/ } from './redux';
// import { changeComputesList } from 'util/store/computedProcess';

export const useSJFSolver = ():void => {
    console.log("Algoritmo SJF");

    // const dispatch = useAppDispatch();
    const processList = useAppSelector(({ computedProcess:{ value } }) => value);

    console.log(groupBy(processList, (a, b) => a.BurstTime - b.BurstTime));
    
    /*dispatch(
        changeComputesList(sortArray(processList,'bursttime'))
    );*/
    useFCFSSolver();
}

export const usePrioritySolver = ():void => {
    console.log("Algoritmo Priority");

    // const dispatch = useAppDispatch();
    const processList = useAppSelector(({ computedProcess:{ value } }) => value);

    console.log(groupBy(processList, (a, b) => a.Priority - b.Priority));
    
    /*dispatch(
        changeComputesList(sortArray(processList,'priority'))
    );*/


    useFCFSSolver();
}