import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Picker from '../../Picker'

export default class OvertimeSettings extends Component {

    getMovesList() {
        const moves = []

        for (let i = 5; i <= 100; i += 5) {
            moves.push({ label: `${i}`, value: `${i}` })
        }

        return moves
    }

    render() {
        const { baseTime, addedTime, moveThreshold } = this.props.settings
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
                    <Text style={styles.settingsHeaderStyle}>Turns</Text>
                    <Picker
                        style={{ marginHorizontal: 10 }}
                        items={this.getMovesList()}
                        width={35}
                        fontSize={15}
                        selected={moveThreshold}
                        onChange={(value) => this.props.updateValue('moveThreshold', value)}
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
