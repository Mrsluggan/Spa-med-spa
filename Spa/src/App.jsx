import { useState } from 'react'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact'
import NoPage from './components/NoPage'
import './App.css'
import Calender from './components/Calender'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  //Varför jag måste ha -1 vettefan, men hatar states
  const [weekNumber, setWeekNumber] = useState(getWeekNumber(new Date()) - 1)
  //Returnar veckans nummer med hjälp av en funktion
  function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil((date.getDay() + numberOfDays) / 7);
    return result;


  }



  //Tillåter Pagenation, ändrar veckans nummer som i sin tur uppdaterar kalendern
  const handleOnclick = (e) => {
    const id = e.currentTarget.getAttribute('id');
    if (weekNumber >= 1) {
      if (id === "prev") {
        setWeekNumber(weekNumber => weekNumber - 1);
      } else if (weekNumber === 1) {
        setWeekNumber(weekNumber => weekNumber + 0);
      } else {
        setWeekNumber(weekNumber => weekNumber + 1);
      }
    }

  }

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>

          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="Calender" element={<div>
            <button id='prev' onClick={handleOnclick}>Förra veckan</button> <button id='next' onClick={handleOnclick}>Nästa Vecka</button><br />
            <input type="date" name="" id="" /> -- under construction
            <h3>
              Glöm inte, om du bokar så kan du inte ångra dig....
            </h3>
            <Calender weekNumber={weekNumber} /></div>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
