export default (time) => {
    let hours = getHours(time)
    let minutes = getMinutes(time)
    let seconds = getSeconds(time)


    if (seconds === 60) {
        if (minutes === 59) {
            hours += 1
            minutes = 0
            seconds = 0
        } else {
            minutes += 1
            seconds = 0
        }
    }

    return {
        hours: prettifyNumber(hours),
        minutes: prettifyNumber(minutes),
        seconds: prettifyNumber(seconds)
    }
}

export const getHours = (time) => Math.floor(time / 3600000)

export const getMinutes = (time) => Math.floor((time - (getHours(time) * 3600000)) / 60000)

export const getSeconds = (time) => Math.ceil((time - ((getHours(time) * 3600000) + (getMinutes(time) * 60000))) / 1000)

export const prettifyNumber = (number) => number < 10 ? `0${number}` : `${number}`