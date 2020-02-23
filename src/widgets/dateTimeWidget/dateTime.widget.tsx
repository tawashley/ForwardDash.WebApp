import React from 'react'

import { useForwardDash } from '../../context/forward-dash.context'

import './dateTime.widget.scss'

export const DateTimeWidget = () => {
    const { clock } = useForwardDash()
    const { date, tickTock } = clock

    return (
        <section className="widget-date-time">
            <h1 className="widget-date-time__date">
                {date.weekDay} {date.dayString} {date.monthLong} {date.year}
            </h1>
            <p className="widget-date-time__time">
                {date.hour}{tickTock ? ':' : ' ' }{date.minutes}
            </p>
        </section>
    )
}
