import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createTransform from 'redux-persist/es/createTransform';
import Flatted from 'flatted';
import RootReducer from '../reducer';

// export const transformCircular = createTransform(
//   (inboundState, key) => Flatted.stringify(inboundState),
//   (outboundState, key) => Flatted.parse(outboundState),
// );

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // transforms: [transformCircular],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  const store = createStore(persistedReducer);

  let persistor = persistStore(store);

  return {store, persistor};
};

//persiststore - to retain store in such a way that no state in store is lost regardless of the app operationally
