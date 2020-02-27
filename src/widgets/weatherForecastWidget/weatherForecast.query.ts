import { gql } from 'apollo-boost';

export const weatherForecastQuery = gql`
    query Forecast($location: String!, $days: String!) {
        weather(location: $location) {
            forecast(days: $days) {
                date,
                dateEpoch,
                uvIndex
                sunrise
                sunset
                maxTemperature {
                    celsius
                },
                minTemperature {
                    celsius
                }
                averageTemperature {
                    celsius
                }
                condition {
                    text
                    iconSrc
                }
            }
        }
    }
`
