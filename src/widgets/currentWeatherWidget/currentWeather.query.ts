import { gql } from 'apollo-boost';

export const currentWeatherQuery = gql`
    query CurrentWeather($location: String!) {
        weather(location: $location) {
            current {
                humidityPercentage
                cloudCoverPercentage
                temperature {
                    celsius,
                    fahrenheit
                }
                feelsLike {
                    celsius
                    fahrenheit
                }
                condition {
                    text
                    iconSrc
                }
            }
        }
    }
`
