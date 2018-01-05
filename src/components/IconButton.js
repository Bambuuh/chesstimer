import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class IconButton extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.containerStyle, this.props.style]}>
                <Icon size={25} color="white" name={this.props.name} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f39c12'
    },
    iconStyle: {

    }
})
