import { ReactComponent as Sunny } from '../assets/svgs/weather-icons/wi-day-sunny.svg'
import { ReactComponent as PartlyCloudy } from '../assets/svgs/weather-icons/wi-cloud.svg'
import { ReactComponent as Cloudy } from '../assets/svgs/weather-icons/wi-cloudy.svg'
import { ReactComponent as Rain } from '../assets/svgs/weather-icons/wi-rain.svg'
import { ReactComponent as Showers } from '../assets/svgs/weather-icons/wi-showers.svg'
import { ReactComponent as Thunderstorm } from '../assets/svgs/weather-icons/wi-thunderstorm.svg'
import { ReactComponent as Fog } from '../assets/svgs/weather-icons/wi-fog.svg'
import { ReactComponent as Sleet } from '../assets/svgs/weather-icons/wi-sleet.svg'
import { ReactComponent as RainMix } from '../assets/svgs/weather-icons/wi-rain-mix.svg'
import { ReactComponent as Drizzle } from '../assets/svgs/weather-icons/wi-sprinkle.svg'
import { ReactComponent as Snow } from '../assets/svgs/weather-icons/wi-snow.svg'
import { ReactComponent as Overcast } from '../assets/svgs/weather-icons/wi-day-sunny-overcast.svg'

import { ReactComponent as __DEFAULT_ICON_NEEDS_MAPPING } from '../assets/svgs/weather-icons/wi-moon-alt-new.svg'


interface WeatherIconMap {
    [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}
/**
 * https://erikflowers.github.io/weather-icons/
 */
export const weatherIconMap: WeatherIconMap = {
    'blizzard': __DEFAULT_ICON_NEEDS_MAPPING,
    'cloudy': Cloudy,
    'drizzle-possible': Drizzle,
    'fog': Fog,
    'freezing-drizzle': __DEFAULT_ICON_NEEDS_MAPPING,
    'freezing-fog': __DEFAULT_ICON_NEEDS_MAPPING,
    'freezing-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'heavy-freezing-drizzle': __DEFAULT_ICON_NEEDS_MAPPING,
    'heavy-rain-at-times': Rain,
    'heavy-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'heavy-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'ice-pellets': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-drizzle': Drizzle,
    'light-ice-pellet-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-rain-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-rain': Rain,
    'light-sheet-showers': Sleet,
    'light-showers': Showers,
    'light-sleet': Sleet,
    'light-snow-patchy': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-snow-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-snow-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'light-snow': Snow,
    'mist': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-freezing-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-ice-pellet-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-rain-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-rain': Rain,
    'moderate-showers': Rain,
    'moderate-sleet-showers': RainMix,
    'moderate-sleet': Sleet,
    'moderate-snow-showers': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-snow-thunder': __DEFAULT_ICON_NEEDS_MAPPING,
    'moderate-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'overcast': Overcast,
    'partly-cloud': PartlyCloudy,
    'patchy-heavy-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'patchy-light-drizzle': Drizzle,
    'patchy-light-rain': __DEFAULT_ICON_NEEDS_MAPPING,
    'patchy-moderate-snow': __DEFAULT_ICON_NEEDS_MAPPING,
    'rain-possible': Rain,
    'sleet-possible': Sleet,
    'snow-possible': Snow,
    'snow': Snow,
    'sunny': Sunny,
    'thunder': Thunderstorm,
    'torrential-showers': Showers,
}
