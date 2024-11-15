import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

export default function WelcomeScreen() {
  const Store = useSelector(store => store);
  useEffect(() => {
    console.log(Store);
  }, []);
  return (
    <View>
      <Text>Welcome Screen ok </Text>
    </View>
  );
}
