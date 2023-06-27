import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

function Signup() {
  auth()
    .createUserWithEmailAndPassword('ss@gmail.com', '123456')
    .then(response => {
      console.log('User account created & signed in!', response);
      Alert.alert('Success ✅', 'Account created successfully');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}
async function AuthLogin(email, password) {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    console.log(userCredential.user.toJSON());
    return userCredential.user.toJSON();
  } catch (e) {
    console.log(e.code, 'ok', e.message);
    Alert.alert(e.code, e.message);
  }
}
export {Signup, AuthLogin};
