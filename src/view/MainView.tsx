import React,{ useContext } from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

import { ComputedProcessContext } from 'context/ComputedContext';
import { PropsHandler, PropsLocked } from 'util/props';
import { LockProcessContext } from 'context/LockContext';
import { TimingContext } from 'context/TimingContext';

const MainView = ({ handleProcessUpdate, handleLockedProcessUpdate, handleTimerUpdate }: PropsHandler & PropsLocked) => {
  const processList = useContext(ComputedProcessContext);
  const lockedProcessList = useContext(LockProcessContext);
  const timer = useContext(TimingContext)

  return (
    <div className='main'>
      <div className='process-container'>
        <ProcessTable lockedProcessList={lockedProcessList} processList={processList} handleLockedProcessUpdate={handleLockedProcessUpdate} />
        <GanttDiagram lockedProcessList={lockedProcessList} processList={processList} timer={timer} />
      </div>
      <Options handleProcessUpdate={handleProcessUpdate} handleTimerUpdate={handleTimerUpdate} />
    </div>
  );
}

export default MainView;