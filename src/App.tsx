import React from 'react';

import './app.scss'

import { DateTimeWidget } from './widgets/dateTimeWidget/dateTime.widget'
import { ForwardDashProvider } from './context/forward-dash.context'

function App() {
  return (
      <ForwardDashProvider>
        <main className="forward-dash-container">
            <section className="forward-dash-content">
                <DateTimeWidget />
                <div>b</div>
                <div>c</div>
                <div>d</div>
                <div>e</div>
            </section>
        </main>
    </ForwardDashProvider>
  );
}
export default App;
