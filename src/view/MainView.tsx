import React from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

import { usePlanificationSolver } from 'hooks/FirstComeSolver';

const MainView = () => {

  usePlanificationSolver();

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