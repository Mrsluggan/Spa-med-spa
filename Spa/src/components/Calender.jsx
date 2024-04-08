import React from 'react'
import { useState } from 'react'
export default function Calender() {
    const [dates, setDates] = useState([]);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const tdStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };
    const generateDates = () => {
        const newDates = Array.from(Array(7).keys()).map((idx) => {
            const d = new Date();
            d.setDate(d.getDate() - d.getDay() + idx);
            return d;
        });
        setDates(newDates);
    };
    useState(() => {
        generateDates();
    }, []);

    const printDates = dates.map(function (date, index) {
        return (
            <tr key={index}>
                <td style={tdStyle}>{date.toLocaleDateString()}<div>{days[date.getDay()]}</div></td>
                
                <td style={tdStyle}>
                    <div><h3>Förmiddag</h3></div>
                    <div>Kallt</div>
                    <div>Varmt</div>
                </td>
                <td style={tdStyle}>
                    <div><h3>Eftermiddag</h3></div>
                    <div>Kallt</div>
                    <div>Varmt</div>
                </td>
                <td style={tdStyle}>
                    <div><h3>Kväll</h3></div>
                    <div>Kallt</div>
                    <div>Varmt</div>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <ul>
                {printDates}
            </ul>
        </div>
    );
}

