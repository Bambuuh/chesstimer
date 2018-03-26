import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, BackHandler } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

import Root from './Root'
import Navigation from './navigation'

const store = createStore(reducers, applyMiddleware(thunk))

export default class App extends Component {
  render() {
    StatusBar.setHidden(true);
    return (
      <Provider style={styles.container} store={store}>
          <Navigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
