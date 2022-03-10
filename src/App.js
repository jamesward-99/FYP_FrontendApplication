// git add .
// git commit -a -m "Added new files: Dashboard.js, Story.js | Modified other files"
// git push -u origin master
import React from 'react';
import './App.css';
import Appbar from './components/Appbar';
import Activity from './components/Activity';
import Story from './components/Story';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
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
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;