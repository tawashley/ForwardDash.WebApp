import React, { Fragment } from 'react'
import { useMappingQuery } from '../../hooks/useMappingQuery'

import { f1RaceScheduleQuery } from './f1RaceSchedule.query'
import { F1RaceSchedule, F1RaceScheduleVariables } from './__generated__/F1RaceSchedule'

import { getDateSegments, toFormattedDateString, getTimeBetweenDates, DateSegments } from '../../utils/date.utils'

import './f1RaceSchedule.scss'

interface MappedRaceData {
    races: Race[]
    nextRace?: Race
}

interface Race {
    round: number;
    raceName: string;
    circuitName: string;
    date: string;
    dateSegments: DateSegments,
    country: string;
    location: string;
    hasHappened: boolean
    daysUntil: number
}

function isDateInThePast(dateString: string): boolean {
    const currentDate = new Date().setHours(0, 0, 0, 0)
    const dateToCompareWith = new Date(dateString).setHours(0, 0, 0, 0)

    return dateToCompareWith < currentDate
}

function mapRaceData(data: F1RaceSchedule): MappedRaceData {
    const raceData = data.f1Data.raceSchedule.races
    const races = raceData.map<Race>((race) => {
        let dateSegments = getDateSegments(race.date)
        let daysUntil = getTimeBetweenDates(new Date(), dateSegments.date).days

        return {
            ...race,
            hasHappened: isDateInThePast(race.date),
            dateSegments,
            daysUntil
        }
    })

    return {
        races,
        nextRace: races.find((race) => !race.hasHappened)
    }
}


export const F1RaceScheduleWidget = () => {
    const [{ races, nextRace }, isLoading] = useMappingQuery<F1RaceSchedule, MappedRaceData, F1RaceScheduleVariables>({
        query: f1RaceScheduleQuery,
        options: {
            variables: {
                year: new Date().getFullYear().toString()
            }
        },
        mapFunction: mapRaceData
    })

    return (
        <section className="widget-f1-race-schedule">
            {isLoading ?
            <p>Getting F1 race schedule</p> :
            <Fragment>
                {nextRace &&
                    <div className="widget-f1-next-race">
                        <p>Round { nextRace.round }</p>
                        <p>{ nextRace.location }, { nextRace.country }</p>
                        <p>in</p>
                        <p>{ nextRace.daysUntil }</p>
                        <p>days</p>
                    </div>
                }
                <ul className="widget-f1-race-schedule-list">
                    {races.map(({ round, raceName, circuitName, hasHappened, dateSegments, country}, index) => {
                        return (
                            <li className={`widget-f1-race-schedule__item ${hasHappened ? 'widget-f1-race-schedule__item--in-the-past' : ''}`} key={index}>
                                <h1>{country}</h1>
                                <p>{circuitName}</p>
                                <p>{ toFormattedDateString('{DD} {MM}', dateSegments) }</p>
                            </li>
                        )
                    })}
                </ul>
            </Fragment>
            }
        </section>
    )
}
