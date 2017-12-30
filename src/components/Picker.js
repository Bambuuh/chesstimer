import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'

export default class CustomPicker extends Component {

    renderTimePicker() {


        const pickers = Object.keys(this.props.time).map(key => (
            <Picker
                key={key}
                style={{ width: this.props.width || 50, height: this.props.height || 200 }}
                itemStyle={{ color: '#f39c12', fontSize: this.props.fontSize || 20 }}
                selectedValue={this.props.time[key]}
                onValueChange={(value) => this.props.onChange(key, value)}>
                {this.getFormat(key)}
            </Picker>
        ))

        return (
            <View style={styles.pickerContainer}>
                {pickers}
            </View>
        )
    }

    prettifyNumber(second) {
        return second < 10 ? `0${second}` : `${second}`
    }

    getFormat(key) {
        if (key === 'hours') {
            return this.getHoursItems()
        } else if (key === 'minutes') {
            return this.getMinutesItems()
        } else {
            return this.getSecondsItems()
        }
    }

    getHoursItems() {
        const hours = []

        for (let i = 0; i <= 99; i++) {
            hours.push(i)
        }

        return hours.map(hour => <Picker.Item key={hour} label={this.prettifyNumber(hour)} value={this.prettifyNumber(hour)} />)
    }

    getMinutesItems() {
        const minutes = []

        for (let i = 0; i < 60; i++) {
            minutes.push(i)
        }

        return minutes.map(minute => <Picker.Item key={minute} label={this.prettifyNumber(minute)} value={this.prettifyNumber(minute)} />)
    }

    getSecondsItems() {
        const seconds = []

        for (let i = 0; i < 60; i += 5) {
            seconds.push(i)
        }

        return seconds.map(second => <Picker.Item key={second} label={this.prettifyNumber(second)} value={this.prettifyNumber(second)} />)
    }

    renderRegularPicker() {
        return (
            <View style={styles.pickerContainer}>
                <Picker
                    style={{ backgroundColor: 'white', width: this.props.width || 200, }}
                    itemStyle={{ color: '#f39c12' }}
                    selectedValue={this.props.selected}
                    onValueChange={(value) => this.props.onChange(value)}>
                    {this.renderRegularItems()}
                </Picker>
            </View>
        )
    }

    renderRegularItems() {
        return this.props.items.map(item => <Picker.Item key={item.value} label={item.label} value={item.value} />)
    }

    render() {
        if (this.props.time) {
            return this.renderTimePicker()
        } else {
            return this.renderRegularPicker()
        }
    }
}

const styles = StyleSheet.create({
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 5
    },
})