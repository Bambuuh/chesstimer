import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'

import { saveSettings } from '../../actions/settingsActions'

import Button from '../Button'
import CheckBox from '../CheckBox'
import Picker from '../Picker'
import NativePicker from 'react-native-wheel-picker'
import theme from '../../styles/theme'

type PropsFromDispatch = {
  saveSettings: (settings: any) => void
}
type PropsFromState = ReturnType<typeof mapStateToProps>
type Props = PropsFromState & PropsFromDispatch

type State = {
  time: {
    hours: string
    minutes: string
    seconds: string
  }
  selectedWarning: number
}

class Settings extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      time: {
        hours: '00',
        minutes: '05',
        seconds: '00'
      },
      selectedWarning: 0
    }
  }

  renderSetting({ name, key, value }) {
    return (
      <CheckBox
        style={styles.checkBox}
        onPress={() => this.updateSetting(key, value)}
        checked={value}
        label={name}
      />
    )
  }

  updateSetting(key, value) {
    this.props.saveSettings({ ...this.props.settings, [key]: !value })
  }

  getWarningList() {
    const { warnings } = this.props.settings
    return Object.keys(warnings)
      .map(key => warnings[key])
      .sort((a, b) => this.sortByTime(a, b))
  }

  addWarning() {
    const { seconds, minutes, hours } = this.state.time
    const key = `${hours}${minutes}${seconds}`
    if (this.props.settings.warnings[key]) {
      return
    }

    const newWarnings = { ...this.props.settings.warnings }
    newWarnings[key] = this.state.time
    this.props.saveSettings({ ...this.props.settings, warnings: newWarnings })
    this.forceUpdate()
  }

  removeWarning() {
    let nextIndex = this.state.selectedWarning

    if (nextIndex === this.props.settings.warnings.length - 1) {
      nextIndex--
      if (nextIndex < 0) {
        nextIndex = 0
      }
    }

    const { hours, minutes, seconds } = this.getWarningList()[
      this.state.selectedWarning
    ]
    const key = `${hours}${minutes}${seconds}`

    const newWarnings = { ...this.props.settings.warnings }
    delete newWarnings[key]
    this.props.saveSettings({ ...this.props.settings, warnings: newWarnings })
    this.setState({ selectedWarning: nextIndex })
    this.forceUpdate()
  }

  sortByTime(timeA, timeB) {
    if (parseInt(timeA.hours) > parseInt(timeB.hours)) {
      return 1
    } else if (parseInt(timeA.hours) < parseInt(timeB.hours)) {
      return -1
    } else {
      if (parseInt(timeA.minutes) > parseInt(timeB.minutes)) {
        return 1
      } else if (parseInt(timeA.minutes) < parseInt(timeB.minutes)) {
        return -1
      } else {
        if (parseInt(timeA.seconds) > parseInt(timeB.seconds)) {
          return 1
        } else if (parseInt(timeA.seconds) < parseInt(timeB.seconds)) {
          return -1
        } else {
          return 0
        }
      }
    }
  }

  renderAddedWarnings() {
    if (Object.keys(this.props.settings.warnings).length === 0) {
      return false
    }
    const marginTop = Platform.OS === 'ios' ? -25 : 0
    return (
      <View style={styles.warningsContainer}>
        <Text style={styles.textStyle}>Active warnings</Text>
        <View style={styles.warningPickerWrapper}>
          <NativePicker
            textColor={'black'}
            style={{ marginTop, width: 160, height: 200 }}
            itemStyle={{ color: '#f39c12', fontSize: 20 }}
            selectedValue={this.state.selectedWarning}
            onValueChange={index => this.setState({ selectedWarning: index })}
          >
            {this.getWarningList().map((time, i) => {
              const value = `${time.hours} : ${time.minutes} : ${time.seconds}`
              return <NativePicker.Item key={value} label={value} value={i} />
            })}
          </NativePicker>
        </View>
        <Button style={styles.buttonStyle} onPress={() => this.removeWarning()}>
          Remove
        </Button>
      </View>
    )
  }

  render() {
    return (
      <ScrollView
        fillViewPort
        contentContainerStyle={styles.settingsContainer}
        style={{ flex: 1, width: '100%' }}
      >
        <View style={styles.checkBoxContainer}>
          {this.renderSetting({
            name: 'Vibrations',
            key: 'vibrations',
            value: this.props.settings.vibrations
          })}
          {this.renderSetting({
            name: 'Tap sounds',
            key: 'tapSounds',
            value: this.props.settings.tapSounds
          })}
          {this.renderSetting({
            name: 'Warning sounds',
            key: 'warningSounds',
            value: this.props.settings.warningSounds
          })}
        </View>
        <View style={styles.warningSetting}>
          <Text style={styles.textStyle}>Add warning</Text>
          <Picker
            time={this.state.time}
            onChange={(key, value) =>
              this.setState({ time: { ...this.state.time, [key]: value } })
            }
          />
          <Button style={styles.buttonStyle} onPress={() => this.addWarning()}>
            Add
          </Button>
        </View>

        {this.renderAddedWarnings()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  settingsContainer: {
    paddingVertical: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkBoxContainer: {
    marginBottom: 20
  },
  checkBox: {
    marginBottom: 20
  },
  warningSetting: {},
  warningsContainer: {
    marginTop: 40
  },
  buttonStyle: {
    marginTop: 20,
    width: 160
  },
  textStyle: {
    color: theme.textColor,
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10
  },
  warningPickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    width: 160
  }
})

const mapStateToProps = ({ settings }) => ({ settings })

export default connect(
  mapStateToProps,
  { saveSettings }
)(Settings)
