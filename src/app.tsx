import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { DateTimeWidget } from './widgets/dateTimeWidget/dateTime.widget'

import './app.scss'

const testQuery = gql`
    query {
        hello
    }
`

export function App() {
    const { data } = useQuery(testQuery)

    useEffect(() => {
        if(data) {
            console.log({ data })
        }
    }, [data])

    return (
        <main className="forward-dash-container">
            <section className="forward-dash-content">
                <DateTimeWidget />
                <div>b</div>
                <div>c</div>
                <div>d</div>
                <div>e</div>
            </section>
        </main>
    );
}
