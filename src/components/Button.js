import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.buttonStyles, this.props.style]} onPress={() => this.props.onPress()}>
                <Text style={styles.textStyles}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyles: {
        backgroundColor: '#f39c12',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    textStyles: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }
})
