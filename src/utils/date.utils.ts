
export function padNumberToTwoDigits(number: number) {
    return (number <= 9 ? '0' + number : number);
}

function monthLongToLetters(number: number) {
    var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return monthList[number];
}

function getDayString(date: number) {
    var dateString;
    var stAtEnd = [1, 21, 31];
    var ndAtEnd = [2, 22];
    var rdAtEnd = [3, 23];
    var thAtEnd = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30]

    if(stAtEnd.indexOf(date) !== -1) {
        dateString = date + 'st';
    }

    if(ndAtEnd.indexOf(date) !== -1) {
        dateString = date + 'nd';
    }

    if(rdAtEnd.indexOf(date) !== -1) {
        dateString = date + 'rd';
    }

    if(thAtEnd.indexOf(date) !== -1) {
        dateString = date + 'th';
    }

    return dateString;
}

function getWeekday(weekDay: number) {
    const weekDayMap = ['Sunday','Monday', 'Tuesday', 'Wednesay', 'Thursday', 'Friday', 'Saturday']

    return weekDayMap[weekDay];
}

export function getDateSegments(isoString?: string | Date) {
    var date = new Date();

    if(isoString !== undefined) {
        date = new Date(isoString);
    }

    var year = date.getFullYear();
    var month = padNumberToTwoDigits(date.getMonth());
    var day = padNumberToTwoDigits(date.getDate());

    var hour = padNumberToTwoDigits(date.getHours());
    var minutes = padNumberToTwoDigits(date.getMinutes());
    var dayString = getDayString(date.getDate());
    var monthLong = monthLongToLetters(date.getMonth());
    var weekDay = getWeekday(date.getDay())

    return {
        year: year,
        month: month,
        monthLong: monthLong,
        day: day,
        dayString: dayString,
        weekDay,
        hour: hour,
        minutes: minutes,
        hourMinutes: [hour, minutes].join(':'),
        fullDate: [day, month, year].join('-'),
        dateObj: date
    };
}
