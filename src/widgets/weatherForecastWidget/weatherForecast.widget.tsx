import React from 'react'

import { useMappingQuery } from '../../hooks/useMappingQuery'

import { weatherForecastQuery } from './weatherForecast.query'
import { Forecast, ForecastVariables, Forecast_weather_forecast } from './__generated__/Forecast'

import { location } from '../../app.config'

import './weatherForecast.scss'
import { getDateSegments } from '../../utils/date.utils'

interface WeatherForecastItemProps {
    forecast: Forecast_weather_forecast
}

const WeatherForecastItem = ({forecast}: WeatherForecastItemProps) => {
    const { weekDayShort, dayString } = getDateSegments(forecast.date)

    return (
        <li className="widget-weather-forecast__forecast-item">
            <p className="widget-weather-forecast__forecast-date">
                { weekDayShort } { dayString }
            </p>
            <section className="widget-weather-forecast__forecast-info">
                <div className="widget-weather-forecast__forecast-condition">
                    <img src={forecast.condition.iconSrc} alt={forecast.condition.text} />
                </div>

                <div className="widget-weather-forecast__forecast-details">
                    <p>{forecast.condition.text}</p>
                    <strong>{ forecast.maxTemperature.celsius.toFixed(0) } °C</strong>
                    <p>{ forecast.minTemperature.celsius.toFixed(0) } °C</p>
                </div>
            </section>
        </li>
    )
}

export const WeatherForecastWidget = () => {
    const [weeklyForecast, isLoading] = useMappingQuery<Forecast, Forecast_weather_forecast[], ForecastVariables>({
        query: weatherForecastQuery,
        options: {
            variables: {
                location,
                days: '7'
            }
        },
        mapFunction: (data) => data.weather.forecast
    })

    return (
        <section className="widget-weather-forecast">
            {isLoading ? (
                <p>Loading 7-day forecast</p>
            ) : (
                <ul className="widget-weather-forecast__forecast">
                    {weeklyForecast.map((dayForecast, index) => <WeatherForecastItem forecast={dayForecast} key={index} />  )}
                </ul>
            )}
        </section>
    )
}
