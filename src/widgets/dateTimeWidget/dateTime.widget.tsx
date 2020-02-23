import React, { useEffect, useState } from 'react'

import { getDateSegments } from '../../utils/date.utils'

import './dateTime.widget.scss'

export const DateTimeWidget = () => {
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
