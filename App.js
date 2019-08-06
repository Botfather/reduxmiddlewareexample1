import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Button,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import Output from './Output';
import appReducer from './AppReducer';
import AsyncActionMW from './AsyncActionMW';

const store = createStore(appReducer, { response: 'Press the button to fetch and load something asynchronously' }, applyMiddleware(AsyncActionMW));

const App = () => {
  const [isActionTriggered, setIsActionTriggered] = useState(false);
  const { response, error } = store.getState();
  useEffect(() => {
    if (isActionTriggered && (response || error)) {
      setIsActionTriggered(false);
    }
  });
  const performSomeAction = () => {
    if (!isActionTriggered) {
      store.dispatch({
        type: 'REQUEST_USER_LIST',
        asyncTask: fetch('https://reqres.in/api/users'),
      });
      setIsActionTriggered(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={
          {
            backgroundColor: '#efefef',
          }
        }
      >
        <View style={
          {
            justifyContent: 'center',
            alignItems: 'center',
          }
        }
        >
          <Button onPress={performSomeAction} title="Send" />
          <Output isActivityStarted={isActionTriggered} textToDisplay={response || error} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
