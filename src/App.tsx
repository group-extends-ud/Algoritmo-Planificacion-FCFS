import React,{ useState } from 'react';
import './App.css';
import MainView from 'view/MainView';
import { LockProcessContext,queueLockedProcess } from 'context/LockContext';
import { ComputedProcessContext,computedProcess } from 'context/ComputedContext';
import { ProcessModel } from 'models/ProcessModel';

const App = () => {

  const [lockedProcess,updateLockedProcess] = useState(queueLockedProcess);
  const [processList,handleProcess] = useState(computedProcess);

  return (
    <ComputedProcessContext.Provider value={processList}>
      <LockProcessContext.Provider value={{lockedProcess,updateLockedProcess}}>
        <MainView handleProcessUpdate={(newProcess: ProcessModel) => {handleProcess([...processList, newProcess])}} />
      </LockProcessContext.Provider>
    </ComputedProcessContext.Provider>
  );
}

export default App;