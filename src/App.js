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
    StatusBar.setHidden(true);
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
