import React from 'react'

import { useClock, ClockProvider } from '../../context/clock.context'

import './dateTime.widget.scss'

const DateTimeWidgetContainer = () => {
    const { date, tickTock } = useClock()
    const { weekDay, dayString, monthLong, minutes, hour } = date

    return (
        <section className="widget-date-time">
            <h1 className="widget-date-time__date">
                {weekDay} {dayString} {monthLong}
            </h1>
            <p className="widget-date-time__time">
                {hour}{tickTock ? ':' : ' ' }{minutes}
            </p>
            <button onClick={() => { document.querySelector('html')?.requestFullscreen() }}>
                Full screen
            </button>
        </section>
    )
}

export const DateTimeWidget = () => {
    return (
        <ClockProvider>
            <DateTimeWidgetContainer />
        </ClockProvider>
    )
}
