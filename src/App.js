// git push -u origin master
import './App.css';
import Appbar from './components/Appbar'
import Activity from './components/Activity'
///////////
import React from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Person from "@material-ui/icons/Person";
///////////
function App() {
  ///////////
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  ///////////
  return (
    <div className="App">
      <Appbar/>
      <Activity/>
      
      <Select value={age}
        variant="outlined" 
        onChange={handleChange} 
        IconComponent={() => <Person />}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      
    </div>
  );
}

export default App;
