import React, { Component } from 'react'

import { Text, View, Picker } from 'react-native'

import Button from '../Button'

export default class SettingsView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            language: 'java'
        }
    }

    render() {
        return (
            <View>
                <Picker
                    style={{width: 100}}
                    itemStyle={{color: 'white'}} 
                    selectedValue={this.state.language}
                    onValueChange={(lang) => this.setState({ language: lang })}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        )
    }
}