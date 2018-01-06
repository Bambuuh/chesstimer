import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import IconButton from './IconButton'

export default class Dialog extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.backgroundStyle} onPress={this.props.onDecline}>
                <TouchableWithoutFeedback>
                    <View style={styles.containerStyle}>
                        <Text style={styles.textStyle}>{this.props.text}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton style={styles.buttonStyle} name="check" onPress={this.props.onAccept} />
                            <IconButton style={styles.buttonStyle} name="times" onPress={this.props.onDecline} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        )
    }
}

const width = Dimensions.get('window').width * 0.75

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    buttonStyle: {
        marginHorizontal: 10
    },
    textStyle: {
        color: '#f39c12',
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 20
    },
    containerStyle: {
        position: 'absolute',
        left: (Dimensions.get('window').width / 2) - (width / 2),
        top: (Dimensions.get('window').height / 2) - 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: width,
        height: 200,
        padding: 40,
        borderRadius: 4,
    }
})
