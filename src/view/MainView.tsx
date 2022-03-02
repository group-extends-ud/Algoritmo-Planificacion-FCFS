import React from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

//
import { useFCFSSolver } from 'hooks/firstComeSolver';
import { usePrioritySolver, useSJFSolver } from 'hooks/algorithmSolvers';
import { useParams } from 'react-router-dom';

const MainView = () => {

  const params = useParams();

  const hooksHandler: {[x: string]: () => void} = {
    useFCFSSolver,
    usePrioritySolver,
    useSJFSolver,
  }

  hooksHandler[params.name!]();

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