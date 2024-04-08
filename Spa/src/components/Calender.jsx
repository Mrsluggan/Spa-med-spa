import React, { useState, useEffect } from 'react';
import Day from './Day';

export default function Calendar(props) {
    const [dates, setDates] = useState([]);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const tdStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    const generateDates = (numDays) => {
        const newDates = Array.from(Array(7).keys()).map((idx) => {
            const d = new Date();
            d.setDate(numDays);

            d.setDate(d.getDate() - d.getDay() + idx);
            return d;
        });
        setDates(newDates);
    };

    useEffect(() => {
        generateDates(props.page || 7);
    }, [props.page]);

    const printDates = dates.map((date, index) => (
        <tr key={index}>
            <td style={tdStyle}>{date.toLocaleDateString()}<div>{days[date.getDay()]}</div></td>
            <Day name="Förmiddag" />
            <Day name="Eftermiddag" />
            <Day name="Kväll" />
        </tr>
    ));

    return (
        <div>
            <table>
                <tbody>
                    {printDates}
                </tbody>
            </table>
        </div>
    );
}
