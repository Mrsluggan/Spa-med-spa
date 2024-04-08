import { useState } from 'react'

import './App.css'
import DbTestSave from './components/dbTestSave'
import Calender from './components/Calender'
function App() {

  return (
    <>
      <div>
        <h1>Välkommen till Spa spa</h1>
        Välj vilken dag du vill boka
        <Calender/>
      </div>
    </>
  )
}

export default App
