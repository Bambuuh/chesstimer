import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'

import theme from '../../styles/theme'

import Button from '../Button'
import { setGameMode } from '../../actions/timerActions'

import Picker from '../Picker'
import { NavigationScreenProps } from 'react-navigation'

type PropsFromState = ReturnType<typeof mapStateToProps>
type PropsFromDispatch = { setGameMode: (mode: string) => void }

type Props = PropsFromState & PropsFromDispatch & NavigationScreenProps

type State = {
  selectedMode: string
}

class ModeView extends Component<Props, State> {
  static navigationOptions = {
    headerLeft: <View />
  }

  modes: { label: string; value: string }[]

  constructor(props) {
    super(props)
    this.state = { selectedMode: this.props.currentMode }
    this.modes = this.getModes()
  }

  selectMode() {
    this.props.setGameMode(this.state.selectedMode)
    this.props.navigation.navigate('Configure')
  }

  getModes() {
    return [
      'Sudden death',
      'Fixed',
      'Hourglass',
      'Overtime',
      'Increment',
      'Delay'
    ].map(mode => ({ label: mode, value: mode }))
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Picker
          width={200}
          selected={this.state.selectedMode}
          items={this.modes}
          onChange={value => this.setState({ selectedMode: value })}
        />
        <Button style={styles.buttonStyle} onPress={() => this.selectMode()}>
          Continue
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    marginTop: theme.baseline * 2
  }
})

const mapStateToProps = ({ timers }) => ({ currentMode: timers.mode })

export default connect(
  mapStateToProps,
  { setGameMode }
)(ModeView)
