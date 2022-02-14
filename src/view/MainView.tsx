import React,{ useContext } from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

import { ComputedProcessContext } from 'context/ComputedContext';
import { PropsHandlerComponent, PropsLocked } from 'util/props';
import { LockProcessContext } from 'context/LockContext';
import { TimingContext } from 'context/TimingContext';
import { usePlanificationSolver } from 'hooks/FirstComeSolver';

const MainView = ({ handleProcessUpdate, handleLockedProcessUpdate, handleTimerUpdate, handleStartedProcessUpdate }: PropsHandlerComponent & PropsLocked ) => {
  const processList = useContext(ComputedProcessContext);
  const lockedProcessList = useContext(LockProcessContext);
  const timer = useContext(TimingContext);

  usePlanificationSolver({ handleProcessUpdate, handleStartedProcessUpdate, handleTimerUpdate });

  return (
    <div className='main'>
      <div className='process-container'>
        <ProcessTable lockedProcessList={lockedProcessList} processList={processList} handleLockedProcessUpdate={handleLockedProcessUpdate} />
        <GanttDiagram lockedProcessList={lockedProcessList} processList={processList} timer={timer} />
      </div>
      <Options handleProcessUpdate={handleProcessUpdate} handleTimerUpdate={handleTimerUpdate} handleStartedProcessUpdate={handleStartedProcessUpdate} />
    </div>
  );
}

export default MainView;