import React from 'react';
import './App.css';
import MainView from 'view/MainView';
import { BrowserRouter, Route, Routes, useParams,useNavigate } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path=':name' element={<MainView />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;