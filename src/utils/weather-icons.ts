import { ReactComponent as Sunny } from '../assets/svgs/weather-icons/wi-day-sunny.svg'
import { ReactComponent as PartlyCloudy } from '../assets/svgs/weather-icons/wi-cloud.svg'
import { ReactComponent as Cloudy } from '../assets/svgs/weather-icons/wi-cloudy.svg'
import { ReactComponent as Rain } from '../assets/svgs/weather-icons/wi-rain.svg'
import { ReactComponent as __DEFAULT_ICON_NEEDS_MAPPING } from '../assets/svgs/weather-icons/wi-moon-alt-new.svg'

interface WeatherIconMap {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export const weatherIconMap: WeatherIconMap = {
    'blizzard': __DEFAULT_ICON_NEEDS_MAPPING,
    'cloudy': Cloudy,
    'drizzle-possible': __DEFAULT_ICON_NEEDS_MAPPING,
    'fog': __DEFAULT_ICON_NEEDS_MAPPING,
    'freezing-drizzle': __DEFAULT_ICON_NEEDS_MAPPING,
    'freezing-fog': __DEFAULT_ICON_NEEDS_MAPPING,
    'freezing-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'heavy-freezing-drizzle': __DEFAULT_ICON_NEEDS_MAPPING,
    'heavy-rain-at-times': Rain,
    'heavy-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'heavy-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'ice-pellets': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-drizzle': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-ice-pellet-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-rain-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-rain': Rain,
    'light-sheet-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-showers': Rain,
    'light-sleet': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-snow-patchy': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-snow-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-snow-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'mist': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-freezing-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-ice-pellet-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-rain-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-rain': Rain,
    'moderate-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-sleet-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-sleet': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-snow-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-snow-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'overcast': __DEFAULT_ICON_NEEDS_MAPPING,
    'partly-cloud': PartlyCloudy,
    'patchy-heavy-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'patchy-light-drizzle': __DEFAULT_ICON_NEEDS_MAPPING,
    'patchy-light-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'patchy-moderate-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'rain-possible': Rain,
    'sleet-possible': __DEFAULT_ICON_NEEDS_MAPPING,
    'snow-possible': __DEFAULT_ICON_NEEDS_MAPPING,
    'snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'sunny': Sunny,
    'thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'torrential-showers': Rain,
}
