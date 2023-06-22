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
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = Configurestore();

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('sub->', subscriber);
    return subscriber; // unsubscribe on unmount
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
