import React from 'react'

export default function Navbar() {
    const navBarStyle = {
        display: 'flex',
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        listStyleType: 'none',


    };
    let audio = new Audio("/SecretMusic.mp3")

    const start = () => {
        audio.play()
      }
    return (
        <div style={navBarStyle}>
            <li className="navItem"><a href='/'>Home</a></li>
            <li className="navItem"><a href='/about'>About</a></li>
            <li className="navItem"><a href='/contact'>Contact</a></li>
            <li className="navItem"><a href='/calender'>Book Appointment</a></li>
            <button onClick={start}>Don't press me</button>

        </div>
    )
    
}
