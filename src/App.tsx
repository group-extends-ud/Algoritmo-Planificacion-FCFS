import React, { useState } from 'react';
import './App.css';
import MainView from 'view/MainView';
import { LockProcessContext, queueLockedProcess } from 'context/LockContext';
import { ComputedProcessContext, computedProcess } from 'context/ComputedContext';
import { ProcessModel } from 'models/ProcessModel';
import { initialTimer, TimingContext } from 'context/TimingContext';

const App = () => {

  const [lockedProcess, handleLockedProcess] = useState(queueLockedProcess);
  const [processList, handleProcess] = useState(computedProcess);
  const [timer, setTimer] = useState(initialTimer);

  const setProcess = (process: ProcessModel) => {
    if (processList.includes(process)) {
      handleProcess(processList.map(p => {
        if(p.Id === process.Id) {
          return process;
        }
        return p;
      }));
    } else {
      handleProcess(processList.concat(process));
    }
  }
  const setLockedProcess = (process: ProcessModel) => {
    if (lockedProcess.includes(process)) {
      handleLockedProcess(lockedProcess.filter(p => p.Id !== process.Id));
    } else {
      handleLockedProcess(lockedProcess.concat(process));
    }
  }

  return (
    <ComputedProcessContext.Provider value={processList}>
      <LockProcessContext.Provider value={lockedProcess}>
        <TimingContext.Provider value={timer}>
          <MainView handleProcessUpdate={setProcess} handleLockedProcessUpdate={setLockedProcess} handleTimerUpdate={setTimer} />
        </TimingContext.Provider>
      </LockProcessContext.Provider>
    </ComputedProcessContext.Provider>
  );
}

export default App;