import React, { useEffect, Fragment } from 'react'
import { useMappingQuery } from '../../hooks/useMappingQuery'

import { f1RaceScheduleQuery } from './f1RaceSchedule.query'
import { F1RaceSchedule, F1RaceScheduleVariables } from './__generated__/F1RaceSchedule'

interface MappedRaceData {
    round: number;
    raceName: string;
    circuitName: string;
    date: string;
    country: string;
    location: string;
    hasHappened: boolean
}

function mapRaceData(data: F1RaceSchedule): MappedRaceData[] {
    const raceData = data.f1Data.raceSchedule.races

    return raceData.map<MappedRaceData>((race) => {
        return {
            ...race,
            hasHappened: false
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
        <Fragment>
            {!isLoading && raceSchedule.map(({ round, raceName, circuitName, hasHappened, date }, index) => {
                return (
                    <section key={index}>
                        <p>{new Date(date).toDateString()}</p>
                        <p>Has it happened yet?: {hasHappened.toString()}</p>
                    </section>
                )
            })}
        </Fragment>
    )
}
