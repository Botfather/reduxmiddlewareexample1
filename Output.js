import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Output = (
  {
    isActivityStarted,
    textToDisplay,
  },
) => (
    <View>
      {

        isActivityStarted
          ? <ActivityIndicator size="large" color="#FF0000" />
          : <Text>{textToDisplay}</Text>
      }
    </View>
  );

export default Output;
