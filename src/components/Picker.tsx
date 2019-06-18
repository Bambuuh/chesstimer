import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, ViewStyle } from 'react-native'

import Picker from 'react-native-wheel-picker'
import { Time } from '../reducers/timerReducer'

type OwnProps = {
  onChange: (key: string, obj?: any) => void
  time?: Time
  minSeconds?: number
  fontSize?: number
  items?: { value: number | string; label: string }[]
  width?: number
  height?: number
  style?: ViewStyle
  selected?: number | string
}

type Props = OwnProps

type State = {
  timers: any
  selected:
    | {
        hours: number
        minutes: number
        seconds: number
      }
    | number
}

export default class CustomPicker extends Component<Props, State> {
  constructor(props) {
    super(props)

    if (this.props.time) {
      this.state = {
        timers: {},
        selected: {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      }

      const list = Object.keys(this.props.time)
      list.forEach(key => {
        this.state.timers[key] = this.getFormat(key)
        this.state.selected[key] = this.state.timers[key].indexOf(
          this.props.time[key]
        )
      })
    } else {
      this.state = {
        timers: {},
        selected: this.getIndexOfItem(this.props.selected)
      }
    }
  }

  getIndexOfItem(item) {
    for (let i = 0; i < this.props.items.length; i++) {
      if (this.props.items[i].value === item) {
        return i
      }
    }
  }

  onTimeChange(key: string, index: number) {
    this.setState({
      selected: { ...(this.state.selected as any), [key]: index }
    })
    this.props.onChange(key, this.state.timers[key][index])
  }

  renderTimePicker() {
    const list = Object.keys(this.props.time)
    const marginTop = Platform.OS === 'ios' ? -25 : 0
    const pickers = list.map((key, index) => (
      <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          textColor={'black'}
          style={{
            marginTop,
            width: this.props.width || 50,
            height: this.props.height || baseHeight
          }}
          itemStyle={{ color: '#f39c12', fontSize: this.props.fontSize || 20 }}
          selectedValue={this.state.selected[key]}
          onValueChange={index => this.onTimeChange(key, index)}
        >
          {this.state.timers[key].map((value, i) => (
            <Picker.Item key={value} label={value} value={i} />
          ))}
        </Picker>
        {index === list.length - 1 || <Text style={styles.colonStyle}>:</Text>}
      </View>
    ))

    return <View style={styles.pickerContainer}>{pickers}</View>
  }

  prettifyNumber(number) {
    return parseInt(number) < 10 ? `0${number}` : `${number}`
  }

  getFormat(key) {
    let minVal = 0
    let maxVal = 0
    if (key === 'hours') {
      maxVal = 99
    } else if (key === 'minutes') {
      maxVal = 59
    } else {
      minVal = this.props.minSeconds || 0
      maxVal = 59
    }

    const values = []

    for (let i = minVal; i <= maxVal; i++) {
      values.push(this.prettifyNumber(i))
    }

    return values
  }

  onRegularChange(index) {
    this.setState({ selected: index })
    this.props.onChange(this.props.items[index].value.toString())
  }

  renderRegularPicker() {
    const marginTop = Platform.OS === 'ios' ? -25 : 0
    return (
      <View style={styles.pickerContainer}>
        <Picker
          style={{
            marginTop,
            width: this.props.width || 185,
            height: this.props.height || baseHeight
          }}
          itemStyle={{ color: '#f39c12', fontSize: this.props.fontSize || 20 }}
          selectedValue={this.state.selected}
          onValueChange={index => this.onRegularChange(index)}
        >
          {this.renderRegularItems()}
        </Picker>
      </View>
    )
  }

  renderRegularItems() {
    return this.props.items.map((item, i) => (
      <Picker.Item key={item.value} label={item.label} value={i} />
    ))
  }

  renderPicker() {
    if (this.props.time) {
      return this.renderTimePicker()
    } else {
      return this.renderRegularPicker()
    }
  }

  render() {
    return <View style={this.props.style}>{this.renderPicker()}</View>
  }
}

const baseHeight = 185

const styles = StyleSheet.create({
  pickerContainer: {
    height: 185,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4
  },
  colonStyle: {
    color: '#f39c12'
  }
})
