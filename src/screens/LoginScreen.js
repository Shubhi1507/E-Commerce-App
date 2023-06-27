import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {regex} from '../utils/regex.utils';
import {ROUTES} from '../navigation/route.constant';
import {useSelector} from 'react-redux';
import {AuthLogin} from '../api/auth';

export default function LoginScreen(props) {
  console.log(props);
  const [Email, setEmail] = useState('');
  const [password, usepassword] = useState('');
  const [error, Seterror] = useState('');

  const Store = useSelector(store => store);
  useEffect(() => {
    console.log(Store);
  }, []);

  function Submit() {}
  const validate = async () => {
    if (!Email) {
      return Seterror('Please enter email');
    }
    if (regex.email.test(Email) == false) {
      return Seterror('Please enter valid email');
    } else Seterror('');

    if (!password) {
      return Seterror('Please enter password');
    }

    if (password.length < 6) {
      return Seterror('Password must be six characters long ');
    } else Seterror('');

    const data = await AuthLogin(Email, password);
    console.log(data);

    if (data) {
      //add redux logic here
    }
  };

  function Navigate() {
    props.navigation.navigate(ROUTES.SIGNUPSCREEN);
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'teal',
      }}>
      <Text>LoginScreen</Text>
      <TextInput
        style={{height: 40, borderColor: 'white', borderWidth: 2, width: 100}}
        placeholder="E-mail"
        onChangeText={newText => setEmail(newText)}
        defaultValue={Email}
      />
      <TextInput
        style={{height: 40, borderColor: 'white', borderWidth: 2, width: 100}}
        placeholder="Password"
        onChangeText={newText => usepassword(newText)}
        defaultValue={password}
        secureTextEntry={true}
      />
      <Button title="SUBMIT" onPress={() => validate()} />
      <Text style={{color: 'orange', fontSize: 30}}>{error}</Text>
      <TouchableOpacity onPress={() => Navigate()}>
        <Text>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
