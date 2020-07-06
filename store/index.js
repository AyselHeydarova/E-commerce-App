import { createStore, combineReducers, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import { authReducer, MODULE_NAME as authModuleName } from "./auth";
import { listsReducer, updateListContent } from "./lists";
import { productsReducer } from "./products";
import { authReducer } from "./auth";
import { usersReducer, setUsersData } from "./users";

// AsyncStorage.clear();

const rootReducer = combineReducers({
  lists: listsReducer,
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
});

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

setUsersData();

export default store;

// async function updateAS() {
//   const state = store.getState();
//   await AsyncStorage.setItem("shop-list-data", JSON.stringify(state));
// }

// export const GET_AS_DATA = "SET_AS_DATA_TO_REDUX";
// const setAsData = (payload) => ({
//   type: GET_AS_DATA,
//   payload,
// });

// const SET_AUTH_DATA_FROM_AS = "SET_AUTH_DATA_FROM_AS";
// const setAuthDataFromAS = (payload) => ({
//   type: SET_AUTH_DATA_FROM_AS,
//   payload,
// });

// async function getDataAs() {
//   const data = await AsyncStorage.getItem("shop-list-data");
//   if (data) {
//     const dataJson = JSON.parse(data);
//     store.dispatch(setAsData(dataJson.lists));
//     store.dispatch(setAuthDataFromAS(dataJson.auth));
//   }
// }
//getDataAs()
// store.subscribe(updateAS);
// store.subscribe(() => {
//   console.log(store.getState());
// });
// AsyncStorage.clear();
