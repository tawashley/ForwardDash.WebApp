type DayInAMonth =
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31'
type MonthNumberString = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
type MonthFullName =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December'

export interface DateSegments {
    /**
     * The full year e.g. '1970'
     */
    year: string
    /**
     * The month string, padded to two characters e.g. '02' for February
     */
    month: MonthNumberString
    /**
     * The month's full name e.g 'February'
     */
    monthLong: MonthFullName
    /**
     * The day of the month, padded to two characters e.g. '09'
     */
    day: DayInAMonth
    /**
     * The full weekday e.g. 'Monday'
     */
    weekDay: string
    /**
     * The short weekday e.g. 'Mon'
     */
    weekDayShort: string
    /**
     * The day of the month with the appropriate suffix e.g. '9th'
     */
    dayString: string
    /**
     * The hour as per a 24-hour clock, padded to two characters e.g. '13'
     */
    hour: string
    /**
     * Minutes, paded to two characters e.g. '04'
     */
    minutes: string
    /**
     * hour and minutes in HH:MM e.g. '09:04'
     */
    hourMinutes: string
    /**
     * Full date in DD/MM/YYYY e.g. '01/01/1970'
     */
    fullDate: string
    /**
     * The date object
     */
    date: Date
}

interface TimeBetweenDates {
    weeks: number
    days: number
}

const monthNamesLong = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

function padNumberToTwoDigits(number: number): string {
    return number <= 9 ? `0${number}` : `${number}`
}

function monthLongToLetters(monthIndex: number): MonthFullName {
    return monthNamesLong[monthIndex] as MonthFullName
}

function getDayString(day: number): string {
    let dateString = ''

    const stAtEnd = [1, 21, 31]
    const ndAtEnd = [2, 22]
    const rdAtEnd = [3, 23]
    const thAtEnd = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30]

    if (stAtEnd.indexOf(day) !== -1) {
        dateString = day + 'st'
    }

    if (ndAtEnd.indexOf(day) !== -1) {
        dateString = day + 'nd'
    }

    if (rdAtEnd.indexOf(day) !== -1) {
        dateString = day + 'rd'
    }

    if (thAtEnd.indexOf(day) !== -1) {
        dateString = day + 'th'
    }

    return dateString
}

function getWeekday(weekDay: number) {
    const weekDayMap = ['Sunday','Monday', 'Tuesday', 'Wednesay', 'Thursday', 'Friday', 'Saturday']

    return weekDayMap[weekDay];
}

function getWeekdayShort(weekDay: number) {
    const weekDayMap = ['Sun','Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

    return weekDayMap[weekDay];
}

/**
 * Takes a format placeholder string along with dateSegments and returns a formatted string.
 *
 * The second argument should be the return object of `getDateSegments`
 *
 * Using an example date of: `1970-01-31T16:04:00`
 *
 * Formats:
 *  - `{YYYY}` -> `1970` (full year)
 *  - `{MM}` -> `January` (full month)
 *  - `{mm}` -> `01` (month number, 2 digits)
 *  - `{dd}` -> `31` (day number)
 *  - `{DD}` -> `31st`(day string)
 *  - `{h}` -> `16` (hour number, 2 digits)
 *  - `{m}` -> `04` (minute number, 2 digits)
 *  - `{day}` -> `Monday` (full week day)
 *  - `{shortDay}` -> `Mon` (short week day)
 *
 * @example
 * toFormattedDateString('{DD} {MM} {YYYY}', dateSegments) //e.g. '31st January 1970'
 */
export function toFormattedDateString(formatPlaceholder: string, dateSegments: DateSegments): string {
    return formatPlaceholder
        .replace(/\{YYYY\}/g, dateSegments.year)
        .replace(/\{MM\}/g, dateSegments.monthLong)
        .replace(/\{mm\}/g, dateSegments.month)
        .replace(/\{dd\}/g, dateSegments.day)
        .replace(/\{DD\}/g, dateSegments.dayString)
        .replace(/\{h\}/g, dateSegments.hour)
        .replace(/\{m\}/g, dateSegments.minutes)
        .replace(/\{day\}/g, dateSegments.weekDay)
        .replace(/\{shortDay\}/g, dateSegments.weekDayShort)
}

/**
 * Parses a date and returns an object of individual segments
 *
 * Accepted arguments are epoch (with milliseconds), string (e.g. ISO-8601) or a Date object
 *
 * If no argument is passed it will use the current date
 *
 * @example
 * getDateSegments('1970-01-01T00:00:00+00:00')
 */
export function getDateSegments(dateConstructorValue?: number | string | Date): DateSegments {
    var date = new Date()

    if (dateConstructorValue !== undefined) {
        date = new Date(dateConstructorValue)
    }

    const year = date.getFullYear().toString()
    const month = padNumberToTwoDigits(date.getMonth() + 1) as MonthNumberString
    const day = padNumberToTwoDigits(date.getDate()) as DayInAMonth

    const hour = padNumberToTwoDigits(date.getHours())
    const minutes = padNumberToTwoDigits(date.getMinutes())
    const dayString = getDayString(date.getDate())
    const monthLong = monthLongToLetters(date.getMonth())
    const weekDay = getWeekday(date.getDay())
    const weekDayShort = getWeekdayShort(date.getDay())

    return {
        year,
        month,
        monthLong,
        weekDay,
        weekDayShort,
        day,
        dayString,
        hour,
        minutes,
        hourMinutes: [hour, minutes].join(':'),
        fullDate: [day, month, year].join('/'),
        date
    }
}

export function getTimeBetweenDates(fromDate: Date, toDate: Date): TimeBetweenDates {
    const diffInMilliSeconds = toDate.getTime() - fromDate.getTime()
    const diffInDays = Math.floor(diffInMilliSeconds / (1000 * 3600 * 24))
    const diffInWeeks = Math.floor(diffInDays / 7)

    return {
        weeks: diffInWeeks,
        days: diffInDays
    }
}
