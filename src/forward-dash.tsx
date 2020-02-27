import React from 'react';

import { DateTimeWidget } from './widgets/dateTimeWidget/dateTime.widget'
import { CurrentWeatherWidget } from './widgets/currentWeatherWidget/currentWeather.widget'
import { WeatherForecastWidget } from './widgets/weatherForecastWidget/weatherForecast.widget'

import './forward-dash.scss'

export function ForwardDash() {
    return (
        <main className="dash-container">
            <section className="dash-content">
                <div className="dash-grid dash-grid--content-height dash-grid--pattern-left-showcase">
                    <DateTimeWidget />
                    <CurrentWeatherWidget />
                </div>
                <div className="dash-grid">
                    <WeatherForecastWidget />
                </div>
                <div className="dash-grid dash-grid--even-fill">
                    <div>1/3</div>
                    <div>1/3</div>
                    <div>1/3</div>
                </div>
            </section>
        </main>
    );
}
