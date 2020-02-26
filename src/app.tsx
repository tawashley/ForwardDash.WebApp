import React from 'react';

import { DateTimeWidget } from './widgets/dateTimeWidget/dateTime.widget'
import { CurrentWeatherWidget } from './widgets/currentWeatherWidget/currentWeather.widget'

import './app.scss'

export function App() {
    return (
        <main className="forward-dash-container">
            <section className="forward-dash-content">
                <DateTimeWidget />
                <CurrentWeatherWidget />
                <div>c</div>
                <div>d</div>
                <div>e</div>
            </section>
        </main>
    );
}
