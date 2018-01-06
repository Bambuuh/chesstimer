import React , { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Picker from '../../Picker'

export default class IncrementSettings extends Component {
    render() {
        const { addedTime, baseTime } = this.props.settings
        return (
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Base</Text>
                    <Picker
                        style={{ marginHorizontal: 10 }}
                        width={35}
                        fontSize={15}
                        time={baseTime}
                        onChange={(key, value) => this.props.updateValue('baseTime', value, key)}
                    />
                </View>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Added</Text>
                    <Picker
                        style={{ marginHorizontal: 10 }}
                        width={35}
                        fontSize={15}
                        time={addedTime}
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
