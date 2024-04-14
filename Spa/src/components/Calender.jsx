import React, { useState, useEffect } from 'react';

export default function Calendar(props) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [dates, setDates] = useState([]);
    const [bookedWeeks, setBookedWeeks] = useState([]);

    const tdStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    const saveBookedWeeksToLocalStorage = (bookedWeeksData) => {
        localStorage.setItem('bookedWeeks', JSON.stringify(bookedWeeksData));
    };

    const loadBookedWeeksFromLocalStorage = () => {
        const bookedWeeksData = localStorage.getItem('bookedWeeks');
        return bookedWeeksData ? JSON.parse(bookedWeeksData) : [];
    };

    const fetchData = async (year) => {
        try {
            const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${year}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const generateDates = async (weekNumber) => {
        if (weekNumber > 0) {
            if (weekNumber < 10) {
                weekNumber = "0" + weekNumber;
            }

            fetchData(new Date().getFullYear())
                .then(data => {
                    const daysInWeek = 7;
                    const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
                    const firstDayOfGivenWeek = new Date(firstDayOfYear);
                    firstDayOfGivenWeek.setDate(firstDayOfGivenWeek.getDate() + (weekNumber - 1) * daysInWeek);
                    console.log(weekNumber);
                    const newDates = [];

                    const redDays = data.dagar.filter(dagar => dagar.vecka.toString() === weekNumber.toString());
                    console.log(redDays);
                    for (let idx = 0; idx < daysInWeek; idx++) {

                        const d = new Date(firstDayOfGivenWeek);
                        d.setDate(d.getDate() + idx);
                        if (redDays[idx]["röd dag"] === "Ja" || redDays[idx]["veckodag"] == "Måndag") {
                        } else {
                            newDates.push(d);

                        }

                    }

                    setDates(newDates);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        }

    };

    const bookTime = (date, partOfDay, packageType) => {
        const weekNumber = props.weekNumber;
        const existingWeekIndex = bookedWeeks.findIndex(week => week.weekNumber === weekNumber);

        if (existingWeekIndex !== -1) {
            const existingWeek = bookedWeeks[existingWeekIndex];
            const existingDayIndex = existingWeek.days.findIndex(day => day.date === date.toLocaleDateString());

            if (existingDayIndex !== -1) {
                const updatedWeeks = [...bookedWeeks];
                updatedWeeks[existingWeekIndex].days[existingDayIndex].booked[partOfDay][packageType].push(prompt("Skriv vem som ska boka"));
                setBookedWeeks(updatedWeeks);
                saveBookedWeeksToLocalStorage(updatedWeeks);
            } else {
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
                saveBookedWeeksToLocalStorage(updatedWeeks);
            }
        } else {
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
            saveBookedWeeksToLocalStorage(updatedWeeks);
        }
    };

    useEffect(() => {
        console.log();
        generateDates(props.weekNumber);
        const loadedBookedWeeks = loadBookedWeeksFromLocalStorage();
        if (loadedBookedWeeks.length > 0) {
            setBookedWeeks(loadedBookedWeeks);
        }
    }, [props.weekNumber]);

    const printDates = dates.map((date, index) => {
        const bookedWeek = bookedWeeks.find(week => week.weekNumber === props.weekNumber);
        const bookedDay = bookedWeek ? bookedWeek.days.find(day => day.date === date.toLocaleDateString()) : null;
        //      console.log(bookedDay);
        return (<tr key={index}>
            <td style={tdStyle}>
                <div>{date.toLocaleDateString()}</div>
                <div>{days[date.getDay()]}</div>
            </td>
            <td>{bookedWeek ? bookedWeek.weekNumber : props.weekNumber}</td>
            <td style={tdStyle}>
                <div>
                    <h3>Förmiddag</h3>
                    <div className="temperature">Kallt
                        <button onClick={() => bookTime(date, 'morning', 'cold')}>
                            {bookedDay && bookedDay.booked.morning.cold.length > 0 ? bookedDay.booked.morning.cold[0] : "Boka"}
                        </button>
                    </div>
                    <div className="temperature">Varmt

                        <button onClick={() => bookTime(date, 'morning', 'warm')}>
                            {bookedDay && bookedDay.booked.morning.warm.length > 0 ? bookedDay.booked.morning.warm[0] : "Boka"}
                        </button>
                    </div>
                </div>
            </td>
            <td style={tdStyle}>
                <div>
                    <h3>Eftermiddag</h3>
                    <div className="temperature">Kallt
                        <button onClick={() => bookTime(date, 'afternoon', 'cold')}>
                            {bookedDay && bookedDay.booked.afternoon.cold.length > 0 ? bookedDay.booked.afternoon.cold[0] : "Boka"}
                        </button>
                    </div>
                    <div className="temperature">Varmt
                        <button onClick={() => bookTime(date, 'afternoon', 'warm')}>
                            {bookedDay && bookedDay.booked.afternoon.warm.length > 0 ? bookedDay.booked.afternoon.warm[0] : "Boka"}
                        </button>
                    </div>

                </div>
            </td>
            <td style={tdStyle}>
                <div>
                    <h3>Kväll</h3>
                    <div className="temperature">Kallt
                        <button onClick={() => bookTime(date, 'evening', 'cold')}>
                            {bookedDay && bookedDay.booked.evening.cold.length > 0 ? bookedDay.booked.evening.cold[0] : "Boka"}
                        </button>
                    </div>

                    <div className="temperature">Varmt
                        <button onClick={() => bookTime(date, 'evening', 'warm')}>
                            {bookedDay && bookedDay.booked.evening.warm.length > 0 ? bookedDay.booked.evening.warm[0] : "Boka"}
                        </button>
                    </div>

                </div>
            </td>

        </tr>);
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
