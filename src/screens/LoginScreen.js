import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {regex} from '../utils/regex.utils';
import {ROUTES} from '../navigation/route.constant';
import {useSelector, useDispatch} from 'react-redux';
import {AuthLogin} from '../api/auth';
import {ACTION_CONSTANTS} from '../redux/action/action';
import messaging from '@react-native-firebase/messaging';

export default function LoginScreen(props) {
  console.log(props);
  const [Email, setEmail] = useState('ss@gmail.com');
  const [password, usepassword] = useState('123456');
  const [error, Seterror] = useState('');
  const dispatcher = useDispatch();

  const Store = useSelector(store => store);
  useEffect(() => {
    fcmToken();
    console.log('abc', Store);
  }, []);

  async function fcmToken() {
    let token = await messaging().getToken();
    console.log(token);
  }

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
      // Login successful , now need to add auth success redux logic here
      dispatcher({type: ACTION_CONSTANTS.LOGIN_SUCCESS, payload: data});
      props.navigation.navigate(ROUTES.WELCOMESCREEN);
    }
  };

  function Navigate() {
    props.navigation.navigate(ROUTES.SIGNUPSCREEN);
  }
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'teal',
    //   }}>
    //   <Text>LoginScreen</Text>
    //   <TextInput
    //     style={{height: 40, borderColor: 'white', borderWidth: 2, width: 100}}
    //     placeholder="E-mail"
    //     onChangeText={newText => setEmail(newText)}
    //     defaultValue={Email}
    //   />
    //   <TextInput
    //     style={{height: 40, borderColor: 'white', borderWidth: 2, width: 100}}
    //     placeholder="Password"
    //     onChangeText={newText => usepassword(newText)}
    //     defaultValue={password}
    //     secureTextEntry={true}
    //   />
    //   <Button title="SUBMIT" onPress={() => validate()} />
    //   <Text style={{color: 'orange', fontSize: 30}}>{error}</Text>
    //   <TouchableOpacity onPress={() => Navigate()}>
    //     <Text>Create an account</Text>
    //   </TouchableOpacity>
    // </View>

    <View>
      <Text style={{backgroundColor: 'teal'}}>HELLOOOOOO</Text>
    </View>
  );
}
