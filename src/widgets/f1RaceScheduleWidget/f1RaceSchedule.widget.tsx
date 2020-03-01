import React, { useEffect, Fragment } from 'react'
import { useMappingQuery } from '../../hooks/useMappingQuery'

import { f1RaceScheduleQuery } from './f1RaceSchedule.query'
import { F1RaceSchedule, F1RaceScheduleVariables } from './__generated__/F1RaceSchedule'

import './f1RaceSchedule.scss'

interface MappedRaceData {
    round: number;
    raceName: string;
    circuitName: string;
    date: string;
    country: string;
    location: string;
    hasHappened: boolean
}

function isDateInThePast(dateString: string): boolean {
    const currentDate = new Date().setHours(0, 0, 0, 0)
    const dateToCompareWith = new Date(dateString).setHours(0, 0, 0, 0)

    return dateToCompareWith < currentDate
}

function mapRaceData(data: F1RaceSchedule): MappedRaceData[] {
    const raceData = data.f1Data.raceSchedule.races

    return raceData.map<MappedRaceData>((race) => {
        return {
            ...race,
            hasHappened: isDateInThePast(race.date)
        }
    })
}


export const F1RaceScheduleWidget = () => {
    const [raceSchedule, isLoading] = useMappingQuery<F1RaceSchedule, MappedRaceData[], F1RaceScheduleVariables>({
        query: f1RaceScheduleQuery,
        options: {
            variables: {
                year: new Date().getFullYear().toString()
            }
        },
        mapFunction: mapRaceData
    })

    useEffect(() => {
        if(!isLoading) {
            console.log('-----')
            console.log(raceSchedule)
        }
    }, [isLoading, raceSchedule])

    return (
        <section className="widget-f1-race-schedule">
            <ul className="widget-f1-race-schedule-list">
                {!isLoading && raceSchedule.map(({ round, raceName, circuitName, hasHappened, date, }, index) => {
                    return (
                        <li className={`widget-f1-race-schedule__item ${hasHappened ? 'widget-f1-race-schedule__item--in-the-past' : ''}`} key={index}>
                            <h1>{raceName}</h1>
                            <p>{circuitName}</p>
                            <p>{new Date(date).toDateString()}</p>
                            {/* <p>Has it happened yet?: {hasHappened.toString()}</p> */}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
