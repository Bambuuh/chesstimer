export default (time) => {
    const hours = getHours(time)
    const minutes = getMinutes(time)
    const seconds = getSeconds(time)

    return {
        hours: prettifyNumber(hours),
        minutes: prettifyNumber(minutes),
        seconds: prettifyNumber(seconds)
    }
}

export const getHours = (time) => Math.floor(time / 3600000)

export const getMinutes = (time) => Math.floor((time - (getHours(time) * 3600000)) / 60000)

export const getSeconds = (time) => Math.floor((time - ((getHours(time) * 3600000) + (getMinutes(time) * 60000))) / 1000)

export const prettifyNumber = (number) => number < 10 ? `0${number}` : `${number}`