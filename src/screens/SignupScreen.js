import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {regex} from '../utils/regex.utils';
import {AuthLogin, Signup} from '../api/auth';
export default function SignupScreen() {
  const [name, Setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [error, setError] = useState('');

  function validate() {
    if (!name) return setError('Please mention name');

    if (!email) {
      return setError('Please enter email');
    }
    if (regex.email.test(email) == false) {
      return setError('Please enter valid email');
    } else setError('');

    if (!password) {
      return setError('Please enter password');
    }

    if (password.length < 6) {
      return setError('Password must be six characters long ');
    } else setError('');

    if (!confirmpassword) {
      return setError('Please enter  confirm password');
    }

    if (password != confirmpassword) {
      return setError('Password do not match');
    } else setError('');
  }
  function Submit() {
    try {
      AuthLogin();
    } catch (error) {
      console.log('e', error);
    }
  }

  return (
    <View style={Styleclass.container}>
      <TextInput
        style={Styleclass.fields}
        placeholder="Name"
        onChangeText={newText => Setname(newText)}
        defaultValue={name}
      />
      <TextInput
        style={Styleclass.fields}
        placeholder="E-mail"
        onChangeText={newText => setemail(newText)}
        defaultValue={email}
      />
      <TextInput
        style={Styleclass.fields}
        placeholder="Password"
        onChangeText={newText => setpassword(newText)}
        defaultValue={password}
      />
      <TextInput
        style={Styleclass.fields}
        placeholder="Set Password"
        onChangeText={newText => setconfirmpassword(newText)}
        defaultValue={confirmpassword}
      />

      <Text style={{color: 'orange', fontSize: 30}}>{error}</Text>
      <Button title="SUBMIT" onPress={() => Submit()} />
    </View>
  );
}
const Styleclass = StyleSheet.create({
  fields: {height: 40, borderColor: 'white', borderWidth: 2, width: 100},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
});
