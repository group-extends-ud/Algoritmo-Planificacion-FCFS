import React from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

//
import { usePlanificationSolver } from 'hooks/firstComeSolver';
import { useSolver } from 'hooks/handlerSolver';
import { useAppSelector } from 'hooks/redux';

const MainView = () => {

  const hooksNames = {
    usePlanificationSolver,
    useSolver
  }

  const useHandler = useAppSelector(({ algorithmSolver:{ value } }):string => value);

  hooksNames[useHandler]();

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