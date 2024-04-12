import React, { useState, useEffect } from 'react';

export default function Calendar(props) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const [dates, setDates] = useState([]);
    const [bookedWeeks, setBookedWeeks] = useState([]);

    const tdStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };



    const generateDates = (weekNumber) => {
        const daysInWeek = 7;
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
        const firstDayOfGivenWeek = new Date(firstDayOfYear);
        firstDayOfGivenWeek.setDate(firstDayOfGivenWeek.getDate() + (weekNumber - 1) * daysInWeek);

        const newDates = [];

        for (let idx = 0; idx < daysInWeek; idx++) {
            const d = new Date(firstDayOfGivenWeek);
            d.setDate(d.getDate() + idx);
            newDates.push(d);
        }

        setDates(newDates);
    };

    const bookTime = (date, partOfDay, packageType) => {
        const weekNumber = getWeekNumber(date);
        const existingWeekIndex = bookedWeeks.findIndex(week => week.weekNumber === weekNumber);

        if (existingWeekIndex !== -1) {
            const existingWeek = bookedWeeks[existingWeekIndex];
            const existingDayIndex = existingWeek.days.findIndex(day => day.date === date.toLocaleDateString());

            if (existingDayIndex !== -1) {
                // Update existing day's bookings
                const updatedWeeks = [...bookedWeeks];
                updatedWeeks[existingWeekIndex].days[existingDayIndex].booked[partOfDay][packageType].push(prompt("Skriv vem som ska boka"));
                setBookedWeeks(updatedWeeks);
            } else {
                // Add new day with booking
                const updatedWeeks = [...bookedWeeks];
                updatedWeeks[existingWeekIndex].days.push({
                    date: date.toLocaleDateString(),
                    booked: {
                        morning: { warm: [], cold: [] },
                        afternoon: { warm: [], cold: [] },
                        evening: { warm: [], cold: [] }
                    }
                });
                updatedWeeks[existingWeekIndex].days[updatedWeeks[existingWeekIndex].days.length - 1].booked[partOfDay][packageType].push(prompt("Skriv vem som ska boka"));
                setBookedWeeks(updatedWeeks);
            }
        } else {
            // Add new week with new day and booking
            const updatedWeeks = [...bookedWeeks];
            updatedWeeks.push({
                weekNumber: weekNumber,
                days: [{
                    date: date.toLocaleDateString(),
                    booked: {
                        morning: { warm: [], cold: [] },
                        afternoon: { warm: [], cold: [] },
                        evening: { warm: [], cold: [] }
                    }
                }]
            });
            updatedWeeks[updatedWeeks.length - 1].days[0].booked[partOfDay][packageType].push(prompt("Skriv vem som ska boka"));
            setBookedWeeks(updatedWeeks);
        }
    };

    useEffect(() => {
        generateDates(props.weekNumber);
    }, [props.weekNumber]);

    const printDates = dates.map((date, index) => {
        const bookedWeek = bookedWeeks.find(week => week.weekNumber === getWeekNumber(date));
        const bookedDay = bookedWeek ? bookedWeek.days.find(day => day.date === date.toLocaleDateString()) : null;
        console.log(bookedDay);
        return (<tr key={index}>
            <td style={tdStyle}>
                <div>{date.toLocaleDateString()}</div>
                <div>{days[date.getDay()]}</div>
            </td>
            <td>{bookedWeek ? bookedWeek.weekNumber : getWeekNumber(date)}</td>
            <td style={tdStyle}>
                <div><h3>Förmiddag</h3></div>
                <button onClick={() => bookTime(date, 'morning', 'cold')}>
                    {bookedDay && bookedDay.booked.morning.cold.length > 0 ? bookedDay.booked.morning.cold[0] : "Boka"}
                </button>
                <button onClick={() => bookTime(date, 'morning', 'warm')}>
                    {bookedDay && bookedDay.booked.morning.warm.length > 0 ? bookedDay.booked.morning.warm[0] : "Boka"}
                </button>
            </td>
            <td style={tdStyle}>
                <div><h3>Eftermiddag</h3></div>
                <button onClick={() => bookTime(date, 'afternoon', 'cold')}>
                    {bookedDay && bookedDay.booked.afternoon.cold.length > 0 ? bookedDay.booked.afternoon.cold[0] : "Boka"}
                </button>
                <button onClick={() => bookTime(date, 'afternoon', 'warm')}>
                    {bookedDay && bookedDay.booked.afternoon.warm.length > 0 ? bookedDay.booked.afternoon.warm[0] : "Boka"}
                </button>
            </td>
            <td style={tdStyle}>
                <div><h3>Kväll</h3></div>
                <button onClick={() => bookTime(date, 'evening', 'cold')}>
                    {bookedDay && bookedDay.booked.evening.cold.length > 0 ? bookedDay.booked.evening.cold[0] : "Boka"}
                </button>
                <button onClick={() => bookTime(date, 'evening', 'warm')}>
                    {bookedDay && bookedDay.booked.evening.warm.length > 0 ? bookedDay.booked.evening.warm[0] : "Boka"}
                </button>
            </td>
        </tr>
        );
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Vecka</th>
                        <th>Förmiddag</th>
                        <th>Eftermiddag</th>
                        <th>Kväll</th>
                    </tr>
                </thead>
                <tbody>
                    {printDates}
                </tbody>
            </table>
        </div>
    );
}

function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

