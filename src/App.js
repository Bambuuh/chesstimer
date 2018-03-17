import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, BackHandler } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

import Root from './Root'

const store = createStore(reducers, applyMiddleware(thunk))

export default class App extends Component {
  render() {
    return (
      <Provider style={{ flex: 1 }} store={store}>
        <View style={styles.container}>
          <StatusBar
            hidden
          />
          <Root />
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
