import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {regex} from '../utils/regex.utils';

export default function LoginScreen() {
  const [Email, setEmail] = useState('');
  const [password, usepassword] = useState('');
  const [error, Seterror] = useState('');

  function Submit() {}
  const validate = () => {
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
  };

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
    </View>
  );
}
