const { combineReducers } = require("redux");
const { default: AuthReducer } = require("./authreducer");

const RootReducer = combineReducers({AuthReducer:AuthReducer})

export default RootReducer;