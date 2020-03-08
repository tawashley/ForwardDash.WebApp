import React, { Fragment, useEffect, useState, useCallback } from 'react'

import { useMappingLazyQuery } from '../../hooks/useMappingQuery'

import { currentWeatherQuery } from './currentWeather.query'
import { CurrentWeather, CurrentWeatherVariables, CurrentWeather_weather_current } from './__generated__/CurrentWeather'

import { location } from '../../app.config'
import { weatherIconMap } from '../../utils/weather-icons'

import './currentWeather.scss'

export const CurrentWeatherWidget = () => {
    const [makeWeatherQuery, { condition, temperature, feelsLike, humidityPercentage }, isLoading] = useMappingLazyQuery<CurrentWeather, CurrentWeather_weather_current, CurrentWeatherVariables>({
        query: currentWeatherQuery,
        options: {
            variables: {
                location
            }
        },
        mapFunction: (data) => data.weather.current
    })

    const getMillisecondsUntilNextHour = useCallback(() => {
        const currentDate = new Date()
        const currentDataPlusOneHour = new Date()

        currentDataPlusOneHour.setHours(currentDate.getHours() + 1)
        currentDataPlusOneHour.setMinutes(0)
        currentDataPlusOneHour.setSeconds(0)
        currentDataPlusOneHour.setMilliseconds(0)

        console.log(currentDataPlusOneHour.getTime() - currentDate.getTime())

        return currentDataPlusOneHour.getTime() - currentDate.getTime()
    }, [])

    const [tickTock, setTickTock] = useState(new Date().getTime())

    // query for the current weather every hour, on the hour after initial mounting of component
    const setQueryTimeout = useCallback(() => {
        setTimeout(() => {
            makeWeatherQuery()
            setTickTock(new Date().getTime())
        }, getMillisecondsUntilNextHour())
    }, [getMillisecondsUntilNextHour, makeWeatherQuery])

    useEffect(() => {
        makeWeatherQuery()
    },  [makeWeatherQuery])

    useEffect(() => {
        setQueryTimeout()
    }, [tickTock, setQueryTimeout])

    const renderIcon = () => {
        const WeatherIcon = weatherIconMap[condition.id]

        return <WeatherIcon className={`widget-curent-weather__icon widget-curent-weather__icon--${condition.id}`} />
    }

    return (
        <section className="widget-current-weather">
            {isLoading ? (
                <p>Loading current forecast</p>
            ) : (
                <Fragment>
                    { condition ? renderIcon() : <Fragment/> }
                    <div className="widget-current-weather__main-panel">
                        <p className="widget-current-weather__temperature">{temperature.celsius.toFixed(0)}</p>
                        <span className="widget-current-weather__symbol">°C</span>
                    </div>
                    <div className="widget-current-weather__side-panel">
                        <p className="widget-current-weather__condition">{condition.text}</p>
                        <p>Feels like {feelsLike.celsius.toFixed(0)}°C</p>
                        <p>Humidity: {humidityPercentage}%</p>
                    </div>
                </Fragment>
            )}
        </section>
    )
}
