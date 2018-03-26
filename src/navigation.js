import React from 'react'
import { StackNavigator } from 'react-navigation'
import { StatusBar, Platform } from 'react-native'

import theme from './styles/theme'

import ModeView from './components/views/ModeView'
import Configure from './components/views/configure'
import Timers from './components/views/TimerView'
import Settings from './components/views/Settings'

const routeConfiguration = {
    Modes: {
        screen: ModeView,
        navigationOptions: {
            title: `Choose mode`,
        }
    },
    Configure: {
        screen: Configure,
        navigationOptions: {
            title: 'Preferenses'
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings'
        }
    },
    Timers: {
        screen: Timers,
        navigationOptions: {
            title: ''
        }
    }
}

const StackConfiguration = {
    cardStyle: {
        backgroundColor: theme.backgroundColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationOptions: ({ navigation }) => ({
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: {
            backgroundColor: theme.nuanceColor,
            borderColor: theme.nuanceColor,
            height: 40,
            padding: 15,
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            color: theme.textColor,
            fontWeight: 'bold',
            fontSize: 26,
            alignSelf: 'center'
        },
    })
}


export default StackNavigator(routeConfiguration, StackConfiguration)