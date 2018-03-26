import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { saveSettings } from '../../actions/settingsActions'

import Button from '../Button'
import CheckBox from '../CheckBox'


class Settings extends Component {
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

    updateSetting (name, value) {
        this.props.saveSettings({ ...this.props.settings, [name]: !value })
    }

    render() {
        return (
            <View>
                <View style={styles.settingsContainer}>
                    {this.renderSetting({name: 'vibrations', value: this.props.settings.vibrations})}
                    {this.renderSetting({name: 'sounds', value: this.props.settings.sounds})}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settingsContainer: {
        marginBottom: 40,
    },
    checkBox: {
        marginBottom: 20,
    }
})

const mapStateToProps = ({ settings }) => ({ settings })

export default connect(mapStateToProps, { saveSettings })(Settings)