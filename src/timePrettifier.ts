export default function(time: number) {
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

export function getHours(time: number) {
  return Math.floor(time / 3600000)
}

export function getMinutes(time: number) {
  return Math.floor((time - getHours(time) * 3600000) / 60000)
}

export function getSeconds(time: number) {
  return Math.ceil(
    (time - (getHours(time) * 3600000 + getMinutes(time) * 60000)) / 1000
  )
}

export function prettifyNumber(number: number) {
  return number < 10 ? `0${number}` : `${number}`
}
