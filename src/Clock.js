import React, { useState, useEffect } from 'react';
import './Clock.css';

const DEFAULT_TIMEZONE = "America/Detroit"

function getLocalTime(timeZone){
    // calling new Date here instead of just in Clock() because we need fresh data every time the func is called
    return new Date().toLocaleTimeString("en-US", {timeZone: timeZone || DEFAULT_TIMEZONE})
}

function getTimeZoneDisplay(timeZone) {
    // just display the city, and make it human readable
    return timeZone.split('/')[1].replace('_', ' ')
}

function getTimeZoneOffset(timeZone){
    const now = new Date()

    // store the date/time of the given time zone
    const localizedDate = new Date(now.toLocaleString("en-US", {timeZone: timeZone || DEFAULT_TIMEZONE}))

    // Extract just the offset
    const offset = Math.round((localizedDate - now) / 36000)
    return offset < 0 ? offset.toString() : `+${offset.toString()}`
}

// Basic clock component
function Clock ({ timeZone, onRemove }) {
    // updates the time every second
    let updateInterval = setInterval(() => {
        setTime(getLocalTime(timeZone))
    }, 1000)

    // hooks ftw
    const [time, setTime] = useState(getLocalTime(timeZone));
    useEffect(() => { 
        return () => { // returned func does cleanup when component unmounts
            clearInterval(updateInterval)
        }
    })

    
   
    return (
        <div className="clock">
            <b>
                {getTimeZoneDisplay(timeZone)}: {time}
                <br />
                {
                    getTimeZoneOffset(timeZone) !== '+0' ? 
                    (<small>Current {getTimeZoneOffset(timeZone)} Hrs</small>) : 
                    ''
                }
            </b>
            <button onClick={() => onRemove(timeZone)} title={'remove ' + getTimeZoneDisplay(timeZone)}>X</button>
        </div>
    )
}

export default Clock;
