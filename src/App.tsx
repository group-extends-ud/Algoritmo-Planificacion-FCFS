import React, { useEffect } from 'react';
import './App.css';
import MainView from 'view/MainView';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="/" element={<Redirect />} />
        <Route path=':name' element={<MainView />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

const Redirect = () => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator('/useFCFSSolver', {replace: true});
  });
  return (<></>);
}

export default App;