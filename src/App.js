import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'

import StartView from './components/views/StartView'
import SettingsView from './components/views/SettingsView'
import TimerView from './components/views/TimerView'

const store = createStore(reducers)

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      view: 'start',
    }
  }

  renderView() {
    switch (this.state.view) {
      case 'settings':
        return <Text>settings</Text>
      case 'timer':
        return <TimerView goBack={() => this.setState({ view: 'start' })} style={styles.viewStyles} />
      default:
        return <StartView
          style={styles.viewStyles}
          goToSettings={() => this.setState({ view: 'settings' })}
          goToTimer={() => this.setState({ view: 'timer' })}
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
