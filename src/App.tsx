import React,{ useState } from 'react';
import './App.css';
import MainView from 'view/MainView';
import { LockProcessContext,queueLockedProcess } from 'context/LockContext';
import { ComputedProcessContext,computedProcess } from 'context/ComputedContext';

const App = () => {

  const [lockedProcess,updateLockedProcess] = useState(queueLockedProcess);
  const [globalProcess,updateGlobalProcess] = useState(computedProcess);

  return (
    <ComputedProcessContext.Provider value={{globalProcess,updateGlobalProcess}}>
      <LockProcessContext.Provider value={{lockedProcess,updateLockedProcess}}>
        <MainView />
      </LockProcessContext.Provider>
    </ComputedProcessContext.Provider>
  );
}

export default App;