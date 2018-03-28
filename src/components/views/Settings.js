import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { saveSettings } from '../../actions/settingsActions'

import Button from '../Button'
import CheckBox from '../CheckBox'
import Picker from '../Picker'
import NativePicker from 'react-native-wheel-picker'
import theme from '../../styles/theme';


class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            time: {
                hours: '00',
                minutes: '05',
                seconds: '00',
            },
            selectedWarning: 0,
        }
    }

    renderSetting({ name, value }) {
        return (
            <CheckBox
                style={styles.checkBox}
                onPress={() => this.updateSetting(name, value)}
                checked={value}
                label={name}
            />
        )
    }

    updateSetting(name, value) {
        this.props.saveSettings({ ...this.props.settings, [name]: !value })
    }

    warningExists() {
        const { hours, minutes, seconds } = this.state.time
        return this.props.settings.warnings.some(warning => warning.hours === hours && warning.minutes === minutes && warning.seconds === seconds)
    }

    addWarning() {
        if (this.warningExists()) {
            return
        }

        const newWarnings = [...this.props.settings.warnings]
        newWarnings.push(this.state.time)

        newWarnings.sort((a, b) => this.sortByTime(a, b))
        this.props.saveSettings({ ...this.props.settings, warnings: newWarnings })
    }

    removeWarning() {
        let nextIndex = this.state.selectedWarning

        if (nextIndex === this.props.settings.warnings.length - 1) {
            nextIndex--;
            if (nextIndex < 0) {
                nextIndex = 0
            }
        }

        const newWarnings = [...this.props.settings.warnings]
        newWarnings.splice(this.state.selectedWarning, 1)
        this.props.saveSettings({ ...this.props.settings, warnings: newWarnings })
        this.setState({ selectedWarning: nextIndex })
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
        if (this.props.settings.warnings.length === 0) {
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
                        onValueChange={(index) => this.setState({ selectedWarning: index })}
                    >
                        {this.props.settings.warnings.map((time, i) => {
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
        const marginTop = Platform.OS === 'ios' ? -25 : 0
        return (
            <ScrollView fillViewPort contentContainerStyle={styles.settingsContainer} style={{ flex: 1, width: "100%" }}>
                <View style={styles.checkBoxContainer}>
                    {this.renderSetting({ name: 'Vibrations', value: this.props.settings.vibrations })}
                    {this.renderSetting({ name: 'Tap sounds', value: this.props.settings.tapSounds })}
                    {this.renderSetting({ name: 'Warning sounds', value: this.props.settings.warningSounds })}
                </View>
                <View style={styles.warningSetting}>
                    <Text style={styles.textStyle}>Add warning</Text>
                    <Picker time={this.state.time} onChange={(key, value) => this.setState({ time: { ...this.state.time, [key]: value } })} />
                    <Button style={styles.buttonStyle} onPress={() => this.addWarning()}>
                        Add
                    </Button>
                </View>

                {this.renderAddedWarnings()}
            </ScrollView>
        )
    }
}

const screenHeight = Dimensions.get('window').height - 40

const styles = StyleSheet.create({
    settingsContainer: {
        paddingVertical: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBoxContainer: {
        marginBottom: 20,
    },
    checkBox: {
        marginBottom: 20,
    },
    warningSetting: {

    },
    warningsContainer: {
        marginTop: 40,
    },
    buttonStyle: {
        marginTop: 20,
        width: 160,
    },
    textStyle: {
        color: theme.textColor,
        fontSize: 24,
        alignSelf: 'center',
        marginBottom: 10,
    },
    warningPickerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        width: 160,
    }
})

const mapStateToProps = ({ settings }) => ({ settings })

export default connect(mapStateToProps, { saveSettings })(Settings)