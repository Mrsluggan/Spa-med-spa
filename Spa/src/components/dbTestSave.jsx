import React from 'react'
import { useState } from 'react'
export default function DbTestSave() {
    const [data, setData] = useState({
        date: "",
        time: "",
        party: "",
    })

    function handleSubmit(event) {
        event.preventDefault();
        console.log(data);
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev)=>{
            return {...prev,[name]:value}
        })

    }

    function saveToDb(data) {
        const jsonData = JSON.stringify(data)
        console.log(jsonData);
    }


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="partyName">Name of the party</label>
                <input type="text" id="partyName" name='party' onChange={handleChange} /><br></br>
                <label htmlFor="dateinput">Choose a date</label>
                <input id="dateinput" name='date' type="date" onChange={handleChange} /><br></br>
                <label htmlFor="time">Choose what time</label>
                <select id="time" name="time" onChange={handleChange}>
                    <option value="fm">fm</option>
                    <option value="em">em</option>
                    <option value="kväll">kväll</option>
                </select><br></br>
                <input type="submit" />

            </form>


        </div>
    )
}
