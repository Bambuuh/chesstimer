import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

type OwnProps = {
  style: ViewStyle
  checked: boolean
  label: string
  onPress: () => void
}

type Props = OwnProps

export default class CheckBox extends Component<Props> {
  renderBox() {
    if (this.props.checked) {
      return <Icon size={25} color="#f39c12" name="check-square" />
    } else {
      return <Icon size={25} color="#f39c12" name="square" />
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
        <View style={styles.container}>
          {this.renderBox()}
          <Text style={styles.text}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20
  }
})
