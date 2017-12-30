import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Picker, StyleSheet } from 'react-native'

import Button from '../Button'
import gameModes from '../../reducers/gameModes'
import { setGameMode } from '../../actions/timerActions'

class ModeView extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.currentMode)
        this.state = {
            selectedMode: this.props.currentMode
        }
    }

    renderGameModes() {
        return Object.keys(gameModes).map(key => <Picker.Item key={key} label={gameModes[key].mode} value={key} />)
    }

    selectMode() {
        this.props.setGameMode(this.state.selectedMode)
        this.props.goToStart()
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.headerStyle}>Choose game mode</Text>
                <Picker
                    style={styles.pickerStyle}
                    itemStyle={{ color: '#f39c12' }}
                    selectedValue={this.state.selectedMode}
                    onValueChange={(mode) => this.setState({ selectedMode: mode })}>
                    {this.renderGameModes()}
                </Picker>
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
    pickerStyle: {
        backgroundColor: 'white',
        width: 200,
        borderRadius: 4
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
