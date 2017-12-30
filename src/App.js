import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'

import StartView from './components/views/StartView'
import ModeView from './components/views/ModeView'
import TimerView from './components/views/TimerView'

const store = createStore(reducers)

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      view: 'start',
      time: {
        minutes: '5',
        seconds: '00'
      }
    }
  }

  goToStart() {
    this.setState({ view: 'start' })
  }

  goToTimers() {
    this.setState({ view: 'timer' })
  }

  goToChangeMode() {
    this.setState({ view: 'change mode' })
  }

  renderView() {
    switch (this.state.view) {
      case 'change mode':
        return <ModeView goToStart={() => this.goToStart()} />
      case 'timer':
        return <TimerView goBack={() => this.goToStart()} style={styles.viewStyles} />
      default:
        return <StartView
          style={styles.viewStyles}
          goToTimer={() => this.goToTimers()}
          goToModeView={() => this.goToChangeMode()}
        />
    }
  }

  render() {
    return (
      <Provider style={{ flex: 1}} store={store}>
        <View style={styles.container}>
          {this.renderView()}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
