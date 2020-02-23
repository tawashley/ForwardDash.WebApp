import React, { createContext, useContext, FC, useEffect, useState, useMemo } from 'react';
import { getDateSegments } from '../utils/date.utils'

interface ForwardDashState {
    clock: {
        date: ReturnType<typeof getDateSegments>
        tickTock: boolean
    }
}

const inititalForwardDashState: ForwardDashState = {
    clock: {
        date: {
            year: 0,
            month: '',
            monthLong: '',
            day: '',
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

}

const ForwardDashContext = createContext(inititalForwardDashState)

export const useForwardDash = () => useContext(ForwardDashContext)

export const ForwardDashProvider: FC = ({ children }) => {
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

    const contextValue = useMemo<ForwardDashState>(() => {
        return {
            ...inititalForwardDashState,
            clock: {
                date,
                tickTock
            }
        };
      }, [date, tickTock]);

    return (
        <ForwardDashContext.Provider value={contextValue}>
            {children}
        </ForwardDashContext.Provider>
    )
}
