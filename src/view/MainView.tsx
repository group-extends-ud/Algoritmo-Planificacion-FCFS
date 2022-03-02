import React from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

//
import { useFCFSSolver } from 'hooks/firstComeSolver';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { groupBy } from 'util/processUtil';
import { changeComputesList } from 'util/store/computedProcess';

const MainView = () => {

  const params = useParams();

  const dispatch = useAppDispatch();
  const processList = useAppSelector(({ computedProcess: { value } }) => value);

  if(params.name === 'useSJFSolver') {
    console.log("Algoritmo SJF");
    const sorterProcessArray = groupBy(processList, (a, b) => a.BurstTime - b.BurstTime);
    if(JSON.stringify(processList) !== JSON.stringify(sorterProcessArray)) {
      dispatch(
        changeComputesList(sorterProcessArray)
    );
    }
  } else if(params.name === 'usePrioritySolver') {
    console.log("Algoritmo Priority");
    const sorterProcessArray = groupBy(processList, (a, b) => b.Priority - a.Priority);
    if(JSON.stringify(processList) !== JSON.stringify(sorterProcessArray)) {
      dispatch(
        changeComputesList(sorterProcessArray)
    );
    }
  }

  useFCFSSolver();

  return (
    <div className='main'>
      <div className='process-container'>
        <ProcessTable />
        <GanttDiagram />
      </div>
      <Options />
    </div>
  );
}

export default MainView;