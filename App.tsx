import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, useColorScheme, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/SplashScreen';
import {ROUTES} from './src/navigation/route.constant';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import WelcomeScreen from './src/screens/welcomescreen';
import {Provider} from 'react-redux';
import Configurestore from './src/redux/store/store';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {PersistGate} from 'redux-persist/integration/react';
import {
  check,
  PERMISSIONS,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {checkNotifications} from 'react-native-permissions';

const {store, persistor} = Configurestore();

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  async function onAuthStateChanged(user: any) {
    setUser(user);
    console.log('xyz', await user);
    if (initializing) setInitializing(false);

    checkNotifications().then(({status, settings}) => {
      console.log('okokokokokookolkmn', status, settings);

      if (status == 'denied') {
        requestNotifications(['alert', 'sound']).then(({status, settings}) => {
          console.log('Request access -----', status, settings);
        });
      } else {
        console.log('Request Permission ------>>> ', status);
      }
    });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    checkNotificationPermission();
    const ABC = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'App opened by notification while in foreground:',
        JSON.stringify(remoteMessage),
      );
    });

    return ABC;
  }, []);

  useEffect(() => {
    requestNotificationPermission();
    const ABC = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'App opened by notification while in background:',
        JSON.stringify(remoteMessage),
      );
    });
  }, []);

  const requestNotificationPermission = async () => {
    // const result = await request(PERMISSIONS.ANDROID);
    // console.log(result)
    // return result;
  };
  const checkNotificationPermission = async () => {
    // const result = await check(PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH);
    // return result;
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ROUTES.LOGINSCREEN}>
            <Stack.Screen
              name={ROUTES.SPLASHSCREEN}
              component={SplashScreen}
              options={{title: 'Overview'}}
            />
            <Stack.Screen name={ROUTES.LOGINSCREEN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.SIGNUPSCREEN} component={SignupScreen} />
            <Stack.Screen
              name={ROUTES.WELCOMESCREEN}
              component={WelcomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
