import React, { Fragment } from 'react'

import { useMappingQuery } from '../../hooks/useMappingQuery'

import { currentWeatherQuery } from './currentWeather.query'
import { CurrentWeather, CurrentWeatherVariables, CurrentWeather_weather_current } from './__generated__/CurrentWeather'

import { location } from '../../app.config'
import { weatherIconMap } from '../../utils/weather-icons'

import './currentWeather.scss'

export const CurrentWeatherWidget = () => {
    const [{ condition, temperature, feelsLike, humidityPercentage }, isLoading] = useMappingQuery<CurrentWeather, CurrentWeather_weather_current, CurrentWeatherVariables>({
        query: currentWeatherQuery,
        options: {
            variables: {
                location
            }
        },
        mapFunction: (data) => data.weather.current
    })

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
