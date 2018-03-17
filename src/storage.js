import { AsyncStorage } from 'react-native'

export const get = () => {
    return AsyncStorage.getItem('settings')
        .then(value => JSON.parse(value))
}

export const save = (settings) => {
    value = JSON.stringify(settings)
    return AsyncStorage.setItem('settings', value)
        .then(() => settings)
}
