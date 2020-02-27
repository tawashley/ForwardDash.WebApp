import React, { Fragment } from 'react'

import { useMappingQuery } from '../../hooks/useMappingQuery'

import { currentWeatherQuery } from './currentWeather.query'
import { CurrentWeather, CurrentWeatherVariables, CurrentWeather_weather_current } from './__generated__/CurrentWeather'

import './currentWeather.scss'

export const CurrentWeatherWidget = () => {
    const [{ condition, temperature, feelsLike, humidityPercentage }, isLoading] = useMappingQuery<CurrentWeather, CurrentWeather_weather_current, CurrentWeatherVariables>({
        query: currentWeatherQuery,
        options: {
            variables: {
                location: 'London'
            }
        },
        mapFunction: (data) => data.weather.current
    })

    return (
        <section className="widget-current-weather">
            {isLoading ? (
                <p>Loading current forecast</p>
            ) : (
                <Fragment>
                    <img src={condition.iconSrc} alt={condition.text} />
                    <div className="widget-current-weather__main-panel">
                        <p className="widget-current-weather__temperature">{temperature.celsius}</p>
                        <span className="widget-current-weather__symbol">°C</span>
                    </div>
                    <div className="widget-current-weather__side-panel">
                        <p className="widget-current-weather__condition">{condition.text}</p>
                        <p>Feels like {feelsLike.celsius}°C</p>
                        <p>Humidity: {humidityPercentage}%</p>
                    </div>
                </Fragment>
            )}
        </section>
    )
}
