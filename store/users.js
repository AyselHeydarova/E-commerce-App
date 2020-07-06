import * as firebase from "firebase";
import "firebase/firestore";

const SET_AUTH_DATA = "SET_AUTH_DATA";

export const selectUserData = (state) => state[MODULE_NAME].usersData;


export const setAuthData = (payload) => ({
    type: SET_AUTH_DATA,
    payload,
});

export const addProductToUsersBag = (product) => async () => {
    try {
        const userProductsRef = firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
        const userProductsSnap = await userProductsRef.get();
        const userData = await userProductsSnap.data();
        userData.userProductsInBag.push(product);
        userProductsRef.set({
                userProductsInBag: userData.userProductsInBag,
            },
            {merge: true})

    } catch (e) {
        console.log('error', e)
    }

};

export const getCurrentUserData = () => async (dispatch) => {
    try {
        const userProductsRef = firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
        const userProductsSnap = await userProductsRef.get();
        const userData = await userProductsSnap.data();
        dispatch(setAuthData({userData}));
        console.log('dispatch(setAuthData({userData}));', dispatch(setAuthData(userData)))
        console.log('currentUserData', userData)
    } catch (e) {
        console.log('error', e)
    }

};

const SET_USERS = "SET_USERS";

export const setUsers = (payload) => ({
    type: SET_USERS,
    payload,
});

export const MODULE_NAME = "users";
export const selectUsers = (state) => state[MODULE_NAME];
export const selectUsernameByID = (state, ID) =>
    state[MODULE_NAME].filter((user) => user.id === ID).username;

const initialState = {
    usersData: {},
}


export function usersReducer(state = initialState, {type, payload}) {
    switch (type) {
        case SET_USERS:
            return [...state, ...payload];
        case SET_AUTH_DATA:
            return {
                usersData: payload,
            };
        default:
            return state;
    }
}

export const setUsersData = () => async (dispatch, getState) => {
    try {
        const users = await getUsersData();
        dispatch(setUsers(users));

        console.log("SetUsersData", users);
    } catch (error) {
        console.log("setUsersData", error);
    }
};
