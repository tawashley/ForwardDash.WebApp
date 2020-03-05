import React from 'react'

import { useMappingQuery } from '../../hooks/useMappingQuery'

import { weatherForecastQuery } from './weatherForecast.query'
import { Forecast, ForecastVariables, Forecast_weather_forecast } from './__generated__/Forecast'

import { location } from '../../app.config'

import './weatherForecast.scss'

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
                    {weeklyForecast.map((dayForecast, index) => {
                        return (
                            <li className="widget-weather-forecast__forecast-item" key={index}>
                                <p>{dayForecast.condition.text}</p>
                                <img src={dayForecast.condition.iconSrc} alt={dayForecast.condition.text} />
                                <div className="widget-weather-forecast__forest-info">
                                    <p>{dayForecast.condition.text}</p>
                                    <p>Max: { dayForecast.maxTemperature.celsius } °C</p>
                                    <p>Min: { dayForecast.minTemperature.celsius } °C</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}
