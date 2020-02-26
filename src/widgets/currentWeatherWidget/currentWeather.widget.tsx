import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { useDataMapper } from '../../hooks/useDataMapper'

import { currentWeatherQuery } from './currentWeather.query'
import { CurrentWeather, CurrentWeatherVariables, CurrentWeather_weather_current } from './__generated__/CurrentWeather'

import './currentWeather.scss'

export const CurrentWeatherWidget = () => {
    const { data, loading } = useQuery<CurrentWeather, CurrentWeatherVariables>(currentWeatherQuery, {
        variables: {
            location: 'London'
        }
    })

    const [currentForecast, isLoading] = useDataMapper<CurrentWeather, CurrentWeather_weather_current>(loading, data as CurrentWeather, (data) => {
        return data.weather.current
    })

    const {
        temperature,
        feelsLike,
        condition,
        humidityPercentage
    } = currentForecast

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
