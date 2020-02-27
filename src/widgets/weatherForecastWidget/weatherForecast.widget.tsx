import React from 'react'

import { useMappingQuery } from '../../hooks/useMappingQuery'

import { weatherForecastQuery } from './weatherForecast.query'
import { Forecast, ForecastVariables, Forecast_weather_forecast } from './__generated__/Forecast'

import './weatherForecast.scss'

export const WeatherForecastWidget = () => {
    const [weeklyForecast, isLoading] = useMappingQuery<Forecast, Forecast_weather_forecast[], ForecastVariables>({
        query: weatherForecastQuery,
        options: {
            variables: {
                location: 'London',
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
                            <li>
                                { dayForecast.date }: {dayForecast.condition.text} (min - { dayForecast.minTemperature.celsius } °C) (max - { dayForecast.maxTemperature.celsius } °C)
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}
