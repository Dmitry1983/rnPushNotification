import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

const App = () => {
  const handleCreateChennel = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id-5', // (required) <<<<=========== !!!
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  const handlePushNotification = async message => {
    PushNotification.localNotification({
      channelId: 'channel-id-5', // (required) <<<<=========== !!!
      message: message.notification.body,
      title: message.notification.title,
    });
    console.log('message : ', message);
  };

  // Слушает открытый App
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(handlePushNotification);
  //   return unsubscribe;
  // }, []);

  messaging().onMessage(handlePushNotification);
  //
  messaging().setBackgroundMessageHandler(handlePushNotification);

  // Token device ID

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token :', token);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePushNotification('test')}>
        <Text>Send Push Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCreateChennel()}>
        <Text>Create Channel Push Notification</Text>
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
