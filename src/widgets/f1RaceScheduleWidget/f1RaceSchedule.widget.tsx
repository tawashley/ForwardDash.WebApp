import React from 'react'
import { useMappingQuery } from '../../hooks/useMappingQuery'

import { f1RaceScheduleQuery } from './f1RaceSchedule.query'
import { F1RaceSchedule, F1RaceScheduleVariables } from './__generated__/F1RaceSchedule'

import { getDateSegments, toFormattedDateString, getTimeBetweenDates, DateSegments } from '../../utils/date.utils'

import { ReactComponent as Australia } from './circuits/australia.svg'
import { ReactComponent as Austria } from './circuits/austria.svg'
import { ReactComponent as Azerbaijan } from './circuits/azerbaijan.svg'
import { ReactComponent as Bahrain } from './circuits/bahrain.svg'
import { ReactComponent as Belgium } from './circuits/belgium.svg'
import { ReactComponent as Brazil } from './circuits/brazil.svg'
import { ReactComponent as Canada } from './circuits/canada.svg'
import { ReactComponent as China } from './circuits/china.svg'
import { ReactComponent as France } from './circuits/france.svg'
import { ReactComponent as Hungary } from './circuits/hungary.svg'
import { ReactComponent as Italy } from './circuits/italy.svg'
import { ReactComponent as Japan } from './circuits/japan.svg'
import { ReactComponent as Mexico } from './circuits/mexico.svg'
import { ReactComponent as Monaco } from './circuits/monaco.svg'
import { ReactComponent as Netherlands } from './circuits/netherlands.svg'
import { ReactComponent as Russia } from './circuits/russia.svg'
import { ReactComponent as Singapore } from './circuits/singapore.svg'
import { ReactComponent as Spain } from './circuits/spain.svg'
import { ReactComponent as Uae } from './circuits/uae.svg'
import { ReactComponent as Uk } from './circuits/uk.svg'
import { ReactComponent as Usa } from './circuits/usa.svg'
import { ReactComponent as Vietnam } from './circuits/vietnam.svg'

import './f1RaceSchedule.scss'

const circuitIconMap: { [key: string]: any} = {
    australia: Australia,
    austria: Austria,
    azerbaijan: Azerbaijan,
    bahrain: Bahrain,
    belgium: Belgium,
    brazil: Brazil,
    canada: Canada,
    china: China,
    france: France,
    hungary: Hungary,
    italy: Italy,
    japan: Japan,
    mexico: Mexico,
    monaco: Monaco,
    netherlands: Netherlands,
    russia: Russia,
    singapore: Singapore,
    spain: Spain,
    uae: Uae,
    uk: Uk,
    usa: Usa,
    vietnam: Vietnam
}

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
