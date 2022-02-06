import React from 'react';
import './main.css';
import ProcessTable from 'view/table/ProcessTable';
import { processArray } from 'util/constants';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';

const MainView = () => {
  return (
    <div className='main'>
      <div className='process-container'>
        <ProcessTable process={processArray} />
        <GanttDiagram />
      </div>
      <Options />
    </div>
  );
}

export default MainView;