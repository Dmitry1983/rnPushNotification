import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const App = () => {
  const handlePushNotification = async message => {
    console.log('message : ', message);
  };

  // Слушает открытый App
  useEffect(() => {
    const unsubscribe = messaging().onMessage(handlePushNotification);

    return unsubscribe;
  }, []);
  //

  // Token device ID

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePushNotification('test')}>
        <Text>Send Push Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  button: {
    marginTop: 50,
    backgroundColor: 'grey',
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
