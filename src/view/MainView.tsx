import React,{ useContext } from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

import { ComputedProcessContext } from 'context/ComputedContext';
import { PropsHandler } from 'util/props';

const MainView = ({ handleProcessUpdate }: PropsHandler) => {
  const processList = useContext(ComputedProcessContext);

  return (
    <div className='main'>
      <div className='process-container'>
        <ProcessTable process={processList} />
        <GanttDiagram />
      </div>
      <Options handleProcessUpdate={handleProcessUpdate} />
    </div>
  );
}

export default MainView;