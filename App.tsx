/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {useState} from 'react';

function HomeScreen() {
  function askConnectAndAdvertisePermission() {
    checkMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
    ])
      .then(response => {
        console.log('response after checkMultiple');
        console.log('response ', JSON.stringify(response, null, 2));
        if (
          response[PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE] ===
            RESULTS.GRANTED &&
          response[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED
        ) {
          console.log('permission  granted already');
        } else {
          requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          ])
            .then(requestedResponse => {
              console.log('response after requestMultiple');
              console.log(
                'response ',
                JSON.stringify(requestedResponse, null, 2),
              );
              if (
                requestedResponse[PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE] ===
                  RESULTS.GRANTED &&
                requestedResponse[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] ===
                  RESULTS.GRANTED
              ) {
                console.log('permission granted by user');
              } else {
                console.log('permission not granted by user');
              }
            })
            .catch(err => {
              console.log('error while requestMultiple ', err);
            });
          console.log('permission not granted already');
        }
      })
      .catch(err => {
        console.log('error while checkMultiple ', err);
      });
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <Button
        title="Ask connect, advertise permission"
        onPress={askConnectAndAdvertisePermission}
      />
    </View>
  );
}

function SettingsScreen() {
  const [counter, setCounter] = useState(0);

  function askConnectAndScanPermission() {
    checkMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ])
      .then(response => {
        console.log('response after checkMultiple');
        console.log('response ', JSON.stringify(response, null, 2));
        if (
          response[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] === RESULTS.GRANTED &&
          response[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] === RESULTS.GRANTED
        ) {
          console.log('permission  granted already');
        } else {
          requestMultiple([
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          ])
            .then(requestedResponse => {
              console.log('response after requestMultiple');
              console.log(
                'response ',
                JSON.stringify(requestedResponse, null, 2),
              );
              if (
                requestedResponse[PERMISSIONS.ANDROID.BLUETOOTH_SCAN] ===
                  RESULTS.GRANTED &&
                requestedResponse[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] ===
                  RESULTS.GRANTED
              ) {
                console.log('permission granted by user');
              } else {
                console.log('permission not granted by user');
              }
            })
            .catch(err => {
              console.log('error while requestMultiple ', err);
            });
          console.log('permission not granted already');
        }
      })
      .catch(err => {
        console.log('error while checkMultiple ', err);
      });
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
      <Button
        title="Ask connect, scan permission"
        onPress={askConnectAndScanPermission}
      />
      <Text>{counter}</Text>
      <Button title="Add counter" onPress={() => setCounter(counter + 1)} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
