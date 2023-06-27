import {ACTION_CONSTANTS} from '../action/action';

let initialState = {isloggedIn: false, userdata: null};

function AuthReducer(state=initialState, action) {
  console.log(action)
  switch (action.type) {
    case ACTION_CONSTANTS.LOGIN_REQUEST:
      return state;

    case ACTION_CONSTANTS.LOGIN_SUCCESS:
      return {...state};

    default:
      return {...state};
  }
}
export default AuthReducer;

//Reducers are functions that consume actions and state and return  new state object .
// business logic could be implemented here depending on the requirement

//action -> 1. type 2. payload

//payload occurs only when state needs to be changed