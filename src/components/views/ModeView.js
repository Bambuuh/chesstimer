import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet } from 'react-native'

import Button from '../Button'
import gameModes from '../../reducers/gameModes'
import { setGameMode } from '../../actions/timerActions'

import Picker from '../Picker'

class ModeView extends Component {

    constructor(props) {
        super(props)
        this.state = { selectedMode: this.props.currentMode }
    }

    selectMode() {
        this.props.setGameMode(this.state.selectedMode)
        this.props.goToStart()
    }

    getItems() {
        return Object.keys(gameModes).map(key => ({ label: gameModes[key].mode, value: key }))
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.headerStyle}>Choose game mode</Text>
                <Picker selected={this.state.selectedMode} items={this.getItems()} onChange={(value) => this.setState({ selectedMode: value })} />
                <Button style={styles.buttonStyle} onPress={() => this.selectMode()}>
                    Select
                </Button>
                <Button style={styles.buttonStyle} onPress={() => this.props.goToStart()}>
                    Cancel
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems: 'center'
    },
    headerStyle: {
        fontSize: 30,
        marginBottom: 20,
        color: '#f39c12'
    },
    buttonStyle: {
        marginTop: 20
    }
})

const mapStateToProps = ({ timers }) => ({ currentMode: timers.key })

export default connect(mapStateToProps, { setGameMode })(ModeView)
