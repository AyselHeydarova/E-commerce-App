import * as firebase from "firebase";
import "firebase/firestore";

import { getUsersData } from "../API";

const SET_USERS = "SET_USERS";
const ADD_SHIPPING_ADDRESS = "ADD_SHIPPING_ADDRESS";

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});

export const addShippingAddress = (payload) => ({
  type: ADD_SHIPPING_ADDRESS,
  payload,
});

export const MODULE_NAME = "users";
export const selectUsers = (state) => state[MODULE_NAME];
export const selectUsernameByID = (state, ID) =>
  state[MODULE_NAME].filter((user) => user.id === ID).username;

const initialState = [];

export function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USERS:
      return [...state, ...payload];
    // FIX shipping redux________________

    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddresses: payload,
      };

    default:
      return state;
  }
}

export const saveShippingAddress = (payload) => async (dispatch, getState) => {
  try {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userRef.get();
    const userData = userSnap.data();

    userData.shippingAddresses.push({
      ...payload,
    });

    userRef
      .set(
        {
          shippingAddresses: userData.shippingAddresses,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with added shipping address to firestore: ",
          error
        );
      });
    dispatch(addShippingAddress(payload));
  } catch (error) {
    console.log("sendReview error", error);
  }
};
export const setUsersData = () => async (dispatch, getState) => {
  try {
    const users = await getUsersData();
    dispatch(setUsers(users));

    console.log("SetUsersData", users);
  } catch (error) {
    console.log("setUsersData", error);
  }
};
