import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import theme from '../styles/theme'

type OwnProps = {
  title: string
  timers: any
}

type Props = OwnProps & NavigationScreenProps

class Header extends Component<Props> {
  getBackButtonOpacity() {
    return this.props.navigation.state.index > 0 ? 1 : 0
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ opacity: this.getBackButtonOpacity() }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backArrowStyle}
          >
            <Icon size={20} color="white" name="chevron-left" />
          </TouchableOpacity>
        </View>
        <Text style={styles.textStyle}>
          {this.props.title || this.props.timers.mode}
        </Text>
        <View style={[styles.backArrowStyle, { opacity: 0 }]}>
          <Icon size={20} color="white" name="chevron-left" />
        </View>
      </View>
    )
  }
}

const backArrowSize = theme.baseline * 3
const radius = backArrowSize / 2

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.nuanceColor,
    paddingVertical: theme.baseline * 2
  },
  textStyle: {
    color: theme.textColor,
    fontSize: 24
  },
  backArrowStyle: {
    marginHorizontal: theme.baseline * 2,
    width: backArrowSize,
    height: backArrowSize,
    borderRadius: radius,
    backgroundColor: theme.buttonColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ timers }: any) => ({ timers })

export default connect(mapStateToProps)(Header)
