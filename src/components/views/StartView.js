import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Button from '../Button'

export default class StartView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.buttonStyles} onPress={() => this.props.goToTimer()}>
                    Start
                </Button>
                <Button style={styles.buttonStyles} onPress={() => this.props.goToSettings()}>
                    Settings
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyles: {
        marginVertical: 20
    },
})
