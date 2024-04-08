import { useState } from 'react'

import './App.css'
import DbTestSave from './components/dbTestSave'
import Calender from './components/Calender'
function App() {
  const [page,setPage] = useState(7)

  const handleOnclick = (e) => {
    const id = e.currentTarget.getAttribute('id');
    if (id === "prev") {
      setPage(prev => prev - 14);
    } else {
      setPage(prev => prev + 14);
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
          <Calender page={page}/>
        </div>
      </div>
    </>
  )
}

export default App
