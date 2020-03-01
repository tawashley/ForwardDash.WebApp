import { gql } from 'apollo-boost';

export const f1RaceScheduleQuery = gql`
query F1RaceSchedule($year: String!) {
    f1Data {
        raceSchedule(year: $year) {
            numberOfRaces
            races {
                round
                raceName
                circuitName
                date
                country
                location
            }
        }
    }
}
`
