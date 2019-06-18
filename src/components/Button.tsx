import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'

import theme from '../styles/theme'

type OwnProps = {
  onPress: () => void
  style: ViewStyle
}

type Props = OwnProps

export default class Button extends Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={[styles.buttonStyles, this.props.style]}
        onPress={() => this.props.onPress()}
      >
        <Text style={styles.textStyles}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: theme.buttonColor,
    width: theme.baseline * 20,
    height: theme.baseline * 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  textStyles: {
    color: theme.buttonTextColor,
    fontSize: 20,
    fontWeight: 'bold'
  }
})
