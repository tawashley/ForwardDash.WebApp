import React, { createContext, useContext, FC, useEffect, useState, useMemo } from 'react';
import { getDateSegments, DateSegments } from '../utils/date.utils'

interface ClockState {
    date: DateSegments
    tickTock: boolean
}

const inititalClockState: ClockState = {
    date: {
        year: '',
        month: '01',
        monthLong: 'January',
        day: '01',
        dayString: '',
        weekDay: '',
        hour: '',
        minutes: '',
        hourMinutes: '',
        fullDate: '',
        date: new Date()
    },
    tickTock: true
}

const ClockContext = createContext(inititalClockState)

export const ClockProvider: FC = ({ children }) => {
    const [date, setDate] = useState(getDateSegments());
    const [tickTock, setTickTock] = useState(true)

    function tick() {
        setDate(getDateSegments());
        setTickTock(!tickTock)
    }

    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    })

    const contextValue = useMemo<ClockState>(() => {
        return {
            ...inititalClockState,
            date,
            tickTock
        };
    }, [date, tickTock]);

    return (
        <ClockContext.Provider value={contextValue}>
            {children}
        </ClockContext.Provider>
    )
}

export const useClock = () => useContext(ClockContext)
