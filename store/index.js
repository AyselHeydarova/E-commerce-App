import { createStore, combineReducers, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { listsReducer, updateListContent } from "./lists";
import { productsReducer } from "./products";
import { authReducer } from "./auth";
import { usersReducer } from "./users";

const rootReducer = combineReducers({
  lists: listsReducer,
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
});

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
export default store;
