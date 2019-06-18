import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Picker from '../../Picker'

type OwnProps = {
  settings: any
  updateValue: (propKey: string, value: any, key: any) => void
}

type Props = OwnProps

export default class DelaySettings extends Component<Props> {
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
            onChange={(key, value) =>
              this.props.updateValue('baseTime', value, key)
            }
          />
        </View>
        <View>
          <Text style={styles.settingsHeaderStyle}>Delay</Text>
          <Picker
            style={{ marginHorizontal: 10 }}
            width={35}
            fontSize={15}
            minSeconds={1}
            time={this.props.settings.addedTime}
            onChange={(key, value) =>
              this.props.updateValue('addedTime', value, key)
            }
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
