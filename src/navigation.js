import React from 'react'
import { StackNavigator } from 'react-navigation'
import { View, StatusBar, Platform, Dimensions } from 'react-native'

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

const width = Dimensions.get('window').width

const StackConfiguration = {
    cardStyle: {
        backgroundColor: theme.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationOptions: ({ navigation }) => ({
        headerTintColor: 'white',
        headerBackTitle: null,
        headerStyle: {
            width: width,
            backgroundColor: theme.nuanceColor,
            borderColor: theme.nuanceColor,
            height: 50,
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf:'center',
            flex: 1,
            color: theme.textColor,
            fontWeight: 'bold',
            fontSize: 26,
        },
        headerRight: (<View />)
    })
}


export default StackNavigator(routeConfiguration, StackConfiguration)