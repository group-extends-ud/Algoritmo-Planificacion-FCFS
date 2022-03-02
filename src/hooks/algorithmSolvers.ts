import { useFCFSSolver } from './firstComeSolver';
import { sortArray } from 'util/processUtil';
import { useAppSelector,useAppDispatch } from './redux';
import { changeComputesList } from 'util/store/computedProcess';

export const useSJFSolver = ():void => {
    console.log("Algoritmo SJF");

    const dispatch = useAppDispatch();
    const processList = useAppSelector(({ computedProcess:{ value } }) => value);
    
    dispatch(
        changeComputesList(sortArray(processList,'bursttime'))
    );
    useFCFSSolver();
}

export const usePrioritySolver = ():void => {
    console.log("Algoritmo Priority");

    const dispatch = useAppDispatch();
    const processList = useAppSelector(({ computedProcess:{ value } }) => value);
    
    dispatch(
        changeComputesList(sortArray(processList,'priority'))
    );


    useFCFSSolver();
}