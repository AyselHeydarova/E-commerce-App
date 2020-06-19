import {createStore, combineReducers, applyMiddleware} from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import {authReducer, MODULE_NAME as authModuleName} from './auth'
import { listsReducer, updateListContent } from './lists';


AsyncStorage.clear();
const rootReducer=combineReducers({
    lists: listsReducer,
    [authModuleName]:authReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
    );

async function updateAS(){
    const state=store.getState();
    await AsyncStorage.setItem('shop-list-data',JSON.stringify(state));
}

export const GET_AS_DATA='SET_AS_DATA_TO_REDUX';
const setAsData=(payload)=>({
    type:GET_AS_DATA,
    payload 
});

const SET_AUTH_DATA_FROM_AS='SET_AUTH_DATA_FROM_AS';
const setAuthDataFromAS=(payload)=>({
    type:SET_AUTH_DATA_FROM_AS,
    payload
});


async function getDataAs(){
    const data=await AsyncStorage.getItem('shop-list-data');
    if (data){
        const dataJson=JSON.parse(data);
        store.dispatch(setAsData(dataJson.lists));
        store.dispatch(setAuthDataFromAS(dataJson.auth));
    }
}
//getDataAs()
store.subscribe(updateAS);
store.subscribe(()=>{
    console.log(store.getState());
})
AsyncStorage.clear();

export default store;