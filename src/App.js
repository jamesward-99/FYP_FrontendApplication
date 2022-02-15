// git push -u origin master
import React from 'react';
import './App.css';
import Appbar from './components/Appbar';
import Activity from './components/Activity';
import Story from './components/Story';
import Dashboard from './components/Dashboard';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/activity" element={<Activity/>}/>
          <Route path="/story" element={<Story/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;