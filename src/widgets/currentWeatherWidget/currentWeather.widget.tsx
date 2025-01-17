import React, { Fragment, useEffect, useState, useCallback } from 'react'

import { useMappingLazyQuery } from '../../hooks/useMappingQuery'
import { useInterval } from '../../hooks/useInterval'

import { currentWeatherQuery } from './currentWeather.query'
import { CurrentWeather, CurrentWeatherVariables, CurrentWeather_weather_current } from './__generated__/CurrentWeather'

import { location } from '../../app.config'
import { weatherIconMap } from '../../utils/weather-icons'
import { getDateSegments, toFormattedDateString } from '../../utils/date.utils'

import './currentWeather.scss'

export const CurrentWeatherWidget = () => {
    const [lastUpdated, setLastUpdated] = useState(getDateSegments())
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

        return currentDataPlusOneHour.getTime() - currentDate.getTime()
    }, [])
    const [msUntilNextHour, setMsUntilNextHour] = useState(getMillisecondsUntilNextHour())

    useEffect(() => {
        makeWeatherQuery()
    }, [makeWeatherQuery])

    useInterval(() => {
        makeWeatherQuery()
        setMsUntilNextHour(getMillisecondsUntilNextHour())
    }, msUntilNextHour)

    useEffect(() => {
        if(!isLoading) {
            setLastUpdated(getDateSegments())
        }
    }, [isLoading])

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
                    <div className="widget-current-weather-inner">
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
                    </div>
                    <p className="widget-current-weather__last-updated">
                        Last updated: { toFormattedDateString('{h}:{m}', lastUpdated)}
                    </p>
                </Fragment>
            )}
        </section>
    )
}
