import React, {useState} from 'react';
import './App.css';
import Clock from './Clock'
import allTimeZones from './timezones'

function App() {

  // myTimeZones: a list of time zones i've selected to keep track of
  // selectedTimeZone: the time zone to be added to myTimeZones
  const [myTimeZones, setMyTimeZones] = useState([])
  const [selectedTimeZone, setSelectedTimeZone] = useState('')

  // Event handler for selecting a new time zone
  function handleChange(event) {
    // a little form validation
    if (allTimeZones.includes(event.target.value)){
      setSelectedTimeZone(event.target.value)
    } else {
      alert('Invalid Timezone Selected')
    }
  }

  // Event handler for adding a new time zone
  function handleAdd() {
    if (selectedTimeZone) {
      setMyTimeZones([...myTimeZones, selectedTimeZone])
    }
  }

  // Event hanlder for removing a time zone
  function handleRemove(timeZone){
    console.log('removing', timeZone)
    let index = myTimeZones.findIndex(tz => timeZone === tz)
    myTimeZones.splice(index, 1)
    console.log(index, myTimeZones)
    setMyTimeZones([...myTimeZones])
  }

  return (
    <div id="app">
      <header>
        <h1 className="app-icon">Dave's Clock App</h1>
        
        <select value={selectedTimeZone} onChange={handleChange}>
          <option value="">Choose Timezone</option>
          {allTimeZones.map((tz, index) => <option key={index}>{tz}</option>)}
        </select>

        <button onClick={handleAdd} className="add-button">Add +</button>
      </header>
    
      <ul className="row-list">
        {myTimeZones.map((tz, index) => <li key={index}><Clock timeZone={tz} onRemove={handleRemove}></Clock></li>)}
      </ul>
    </div>
  );
}

export default App;
