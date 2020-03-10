import React, { createContext, useContext, FC, useEffect, useState, useMemo } from 'react';
import { getDateSegments, DateSegments } from '../utils/date.utils'

import { useInterval } from '../hooks/useInterval'

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
        weekDayShort: '',
        hour: '',
        minutes: '',
        hourMinutes: '',
        fullDate: '',
        date: new Date(),
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

    useInterval(tick, 1000)

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
