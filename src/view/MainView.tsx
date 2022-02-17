import React, { useContext } from 'react';
import ProcessTable from 'view/table/ProcessTable';
import GanttDiagram from './gannt/GanttDiagram';
import Options from './options/Options';
import './main.css';

import { ComputedProcessContext } from 'context/ComputedContext';
import { PropsHandlerComponent, PropsLocked } from 'util/props';
import { LockProcessContext } from 'context/LockContext';
import { TimingContext } from 'context/TimingContext';
import { usePlanificationSolver } from 'hooks/FirstComeSolver';

const MainView = (
  { handleProcessUpdate, 
    handleTimerUpdate, 
    handleStartedProcessUpdate, 
    handleCurrentProcessUpdate,
    handleLockedProcessUpdate
  }: PropsHandlerComponent & PropsLocked) => {

  const processList = useContext(ComputedProcessContext);
  const lockedProcessList = useContext(LockProcessContext);
  const timer = useContext(TimingContext);

  usePlanificationSolver({
    handleProcessUpdate, 
    handleStartedProcessUpdate, 
    handleTimerUpdate, 
    handleCurrentProcessUpdate,
    handleLockedProcessUpdate 
  });

  return (
    <div className='main'>
      <div className='process-container'>
        <ProcessTable
          lockedProcessList={lockedProcessList}
          processList={processList}
          handleCurrentProcessUpdate={handleCurrentProcessUpdate}
        />
        <GanttDiagram
          lockedProcessList={lockedProcessList}
          processList={processList}
          timer={timer}
          handleCurrentProcessUpdate={handleCurrentProcessUpdate}
        />
      </div>
      <Options
        handleProcessUpdate={handleProcessUpdate}
        handleTimerUpdate={handleTimerUpdate}
        handleStartedProcessUpdate={handleStartedProcessUpdate}
        handleCurrentProcessUpdate={handleCurrentProcessUpdate}
        handleLockedProcessUpdate={handleLockedProcessUpdate}
      />
    </div>
  );
}

export default MainView;