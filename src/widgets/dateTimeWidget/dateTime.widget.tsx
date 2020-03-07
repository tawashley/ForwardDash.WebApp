import React, { useState, useEffect } from 'react'

import { useClock, ClockProvider } from '../../context/clock.context'

import './dateTime.widget.scss'

const DateTimeWidgetContainer = () => {
    const { date, tickTock } = useClock()
    const { weekDay, dayString, monthLong, minutes, hour } = date
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [buttonText, setButtonText] = useState('Go fullscreen');

    useEffect(() => {
        if(isFullscreen) {
            setButtonText('Exit full screen')
        } else {
            setButtonText('Go fullscreen')
        }
    }, [isFullscreen])

    return (
        <section className="widget-date-time">
            <h1 className="widget-date-time__date">
                {weekDay} {dayString} {monthLong}
                <button onClick={() => {
                      if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen();
                        setIsFullscreen(true)
                      } else {
                          document.exitFullscreen();
                          setIsFullscreen(false)
                      }
                 }}>
                    { buttonText }
                </button>
            </h1>
            <p className="widget-date-time__time">
                {hour}{tickTock ? ':' : ' ' }{minutes}
            </p>
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
