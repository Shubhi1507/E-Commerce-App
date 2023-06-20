import {View, Text, Button, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ROUTES} from '../navigation/route.constant';

export default function SplashScreen({navigation}) {
  const [x, useX] = useState('');
  useEffect(() => {
    setTimeout(() => {
      //   Alert.alert('abc');
      navigation.navigate(ROUTES.LOGINSCREEN);
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      }}>
      <Text>SplashScreen</Text>

      <Button title="OK RUN" onPress={() => {}} />
    </View>
  );
}
