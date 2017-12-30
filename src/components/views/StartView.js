import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native'

import { setTimers } from '../../actions/timerActions'

import Button from '../Button'

class StartView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hours: '00',
            minutes: '05',
            seconds: '00'
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

    prettifyNumber(second) {
        return second < 10 ? `0${second}` : `${second}`
    }

    onPress() {
        this.props.setTimers(this.state)
        this.props.goToTimer()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                <Picker
                        style={{ width: 50 }}
                        itemStyle={{ color: '#f39c12' }}
                        selectedValue={this.state.hours}
                        onValueChange={(hours) => this.setState({ hours })}>
                        {this.getHoursItems()}
                    </Picker>
                    <Text style={styles.commaStyle}>:</Text>
                    <Picker
                        style={{ width: 50 }}
                        itemStyle={{ color: '#f39c12' }}
                        selectedValue={this.state.minutes}
                        onValueChange={(minutes) => this.setState({ minutes })}>
                        {this.getMinutesItems()}
                    </Picker>
                    <Text style={styles.commaStyle}>:</Text>
                    <Picker
                        style={{ width: 50 }}
                        itemStyle={{ color: '#f39c12' }}
                        selectedValue={this.state.seconds}
                        onValueChange={(seconds) => this.setState({ seconds })}>
                        {this.getSecondsItems()}
                    </Picker>
                </View>
                <Button style={styles.buttonStyles} onPress={() => this.onPress()}>
                    Start
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4
    },
    buttonStyles: {
        marginVertical: 20
    },
    commaStyle: {
        fontSize: 20,
        paddingBottom: 5,
        color: '#f39c12'
    }
})



export default connect(null, { setTimers })(StartView)
