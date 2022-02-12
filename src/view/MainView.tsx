import React,{ useContext } from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

import { ComputedProcessContext } from 'context/ComputedContext';

const MainView = () => {
  const { globalProcess } = useContext(ComputedProcessContext);

  return (
    <div className='main'>
      <div className='process-container'>
        <ProcessTable process={globalProcess} />
        <GanttDiagram />
      </div>
      <Options />
    </div>
  );
}

export default MainView;