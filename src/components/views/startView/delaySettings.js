import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Picker from '../../Picker'

export default class DelaySettings extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Base</Text>
                    <Picker
                        style={{ marginHorizontal: 10 }}
                        width={35}
                        fontSize={15}
                        time={this.props.settings.baseTime}
                        onChange={(key, value) => this.props.updateValue('baseTime', value, key)}
                    />
                </View>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Delay</Text>
                    <Picker
                        style={{ marginHorizontal: 10 }}
                        width={35}
                        fontSize={15}
                        time={this.props.settings.addedTime}
                        onChange={(key, value) => this.props.updateValue('addedTime', value, key)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settingsHeaderStyle: {
        marginBottom: 10,
        color: '#f39c12',
        textAlign: 'center'
    }
})
