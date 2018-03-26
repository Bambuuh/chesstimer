import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'

import theme from '../../styles/theme'

import Button from '../Button'
import { setGameMode } from '../../actions/timerActions'

import Picker from '../Picker'
import Header from '../Header'

class ModeView extends Component {

    constructor(props) {
        super(props)
        this.state = { selectedMode: this.props.currentMode }
    }

    selectMode() {
        this.props.setGameMode(this.state.selectedMode)
        this.props.navigation.navigate('Configure')
    }

    getItems() {
        return ['Sudden death', 'Fixed', 'Hourglass', 'Overtime', 'Increment', 'Delay'].map(mode => ({ label: mode, value: mode }))
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Picker
                    width={200}
                    selected={this.state.selectedMode}
                    items={this.getItems()} onChange={(value) => this.setState({ selectedMode: value })}
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
        alignItems: 'center',
    },
    buttonStyle: {
        marginTop: (theme.baseline * 2)
    }
})

const mapStateToProps = ({ timers }) => ({ currentMode: timers.mode })

export default connect(mapStateToProps, { setGameMode })(ModeView)
