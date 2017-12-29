import React, { Component } from 'react'

import { Text, View } from 'react-native'

import Button from '../Button'

export default class SettingsView extends Component {
    render() {
        return (
            <View>
                <Button onPress={() => this.props.backToStart()}>
                    Back
                </Button>
            </View>
        )
    }
}