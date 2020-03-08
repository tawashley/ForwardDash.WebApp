import React from 'react'
import { useMappingQuery } from '../../hooks/useMappingQuery'

import { f1RaceScheduleQuery } from './f1RaceSchedule.query'
import { F1RaceSchedule, F1RaceScheduleVariables } from './__generated__/F1RaceSchedule'

import { getDateSegments, toFormattedDateString, getTimeBetweenDates, DateSegments } from '../../utils/date.utils'

import { circuitIconMap } from './circuit-icons'

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

    if(isLoading) {
        return <p>Getting F1 race schedule</p>
    }

    return (
        <section className="widget-f1-race-schedule">
            {nextRace &&
                <div className="widget-f1-next-race">
                    <p className="widget-f1-next-race__round">Round { nextRace.round }</p>
                    <div className="widget-f1-next-race__location">
                        <strong className="widget-f1-next-race__country">{ nextRace.country }</strong>
                        <p className="widget-f1-next-race__location-name">{ nextRace.location }</p>
                    </div>
                    <p className="widget-f1-next-race__count">{ nextRace.daysUntil }</p>
                    <p>days</p>
                </div>
            }
            <ul className="widget-f1-race-schedule-list">
                {races.map(({ round, raceName, circuitName, hasHappened, dateSegments, country}, index) => {
                    const CircuitIcon = circuitIconMap[country.toLowerCase()]

                    return (
                        <li className={`widget-f1-race-schedule__item ${hasHappened ? 'widget-f1-race-schedule__item--in-the-past' : ''}`} key={index}>
                            <div className="widget-f1-race-schedule__circuit-info">
                                <h1>{country}</h1>
                                <p>{circuitName}</p>
                                <p>{ toFormattedDateString('{DD} {MM}', dateSegments) }</p>
                            </div>
                            <CircuitIcon className="widget-f1-race-schedule__circuit-icon" />
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
