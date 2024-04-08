import React from 'react'
import { useState } from 'react'
export default function Day(props) {
    const [warm, setWarm] = useState("Varmt")
    const [cold, setCold] = useState("Kallt")

    const tdStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };
    const styles = {
        button: {
            background: 'none',
            border: 'none',
            font: 'inherit',
            cursor: 'pointer',
            outline: 'inherit',
            color: 'inherit', // Använd ärftlig färg
        },
    };
    const handleOnclick = (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const party = prompt("Skriv vem som ska boka")
        if (id == cold) {
            setCold(party)
        }else{
            setWarm(party)
        }

    }

    return (
        <td style={tdStyle}>
        <div><h3>{props.name}</h3></div>
        <button style={styles.button} data-id='cold' onClick={handleOnclick}><div>{cold}</div></button>
        <button style={styles.button} data-id='warm' onClick={handleOnclick}><div>{warm}</div></button>
    </td>
    )
}
