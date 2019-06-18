import { AsyncStorage } from 'react-native'

export async function get() {
  const value = await AsyncStorage.getItem('settings')
  return JSON.parse(value as string)
}

export async function save(settings: object) {
  const value = JSON.stringify(settings)
  await AsyncStorage.setItem('settings', value)
  return settings
}
