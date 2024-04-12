import { useState } from 'react'

import './App.css'
import DbTestSave from './components/dbTestSave'
import Calender from './components/Calender'
function App() {
  const [weekNumber, setWeekNumber] = useState(getWeekNumber(new Date()) - 1)

  function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + numberOfDays) / 7);
  }



  const handleOnclick = (e) => {
    const id = e.currentTarget.getAttribute('id');
    if (id === "prev") {
      setWeekNumber(weekNumber => weekNumber - 1);
    } else {
      setWeekNumber(weekNumber => weekNumber + 1);
    }
  }

  return (
    <>
      <div>
        <h1>Välkommen till Spa spa</h1>
        Välj vilken dag du vill boka

        <div>
          <button id='prev' onClick={handleOnclick}>Förra veckan</button> <button id='next' onClick={handleOnclick}>Nästa Vecka</button><br />
          <input type="date" name="" id="" />
          <Calender weekNumber={weekNumber} />
        </div>
      </div>
    </>
  )
}

export default App
