import * as firebase from "firebase";
import "firebase/firestore";
import { getUsersData } from "../API";

export const MODULE_NAME = "users";

export const selectUserData = (state) => state[MODULE_NAME].usersData;
export const selectCurrentUserShippingAddresses = (state) =>
  state[MODULE_NAME].usersData.shippingAddresses;

const SET_AUTH_DATA = "SET_AUTH_DATA";
const ADD_SHIPPING_ADDRESS = "ADD_SHIPPING_ADDRESS";

export const addShippingAddress = (payload) => ({
  type: ADD_SHIPPING_ADDRESS,
  payload,
});

export const setAuthData = (payload) => ({
  type: SET_AUTH_DATA,
  payload,
});

const initialState = {
  usersData: {},
};

export function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        usersData: payload,
      };
    // FIX shipping redux________________

    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        usersData: [...state.usersData, { shippingAddresses: payload }],
      };

    default:
      return state;
  }
}

export const addProductToUsersBag = (product) => async () => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const userProductsSnap = await userProductsRef.get();
    const userData = await userProductsSnap.data();
    userData.userProductsInBag.push(product);
    userProductsRef.set(
      {
        userProductsInBag: userData.userProductsInBag,
      },
      { merge: true }
    );
  } catch (e) {
    console.log("error", e);
  }
};

export const getCurrentUserData = () => async (dispatch) => {
  try {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(function (doc) {
        console.log("Current Snapshotdata: ", doc.data());
        dispatch(setAuthData(doc.data()));
      });
    console.log("currentUserData", currentUserData);
  } catch (e) {
    console.log("getCurrentUserData error", e);
  }
};

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

export const selectShippingAddress = async (pressedIndex) => {
  try {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userRef.get();
    const userData = userSnap.data();

    userData.shippingAddresses.map((address, index) => {
      if (index === pressedIndex) {
        address.isSelected = true;
      } else {
        address.isSelected = false;
      }
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
          "Something went wrong with a selectShippingAddressto firestore: ",
          error
        );
      });
    // dispatch(addShippingAddress(payload));
  } catch (error) {
    console.log("selectShippingAddress error", error);
  }
};

export const changeUsernameAndPhoto = async (payload) => {
  try {
    const response = await fetch(payload.userPhoto);
    const blob = await response.blob();
    const key = firebase.database().ref("key").push().key;
    const snap = await firebase.storage().ref(key).put(blob);
    const url = await snap.ref.getDownloadURL();

    const settingsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const settingsSnap = await settingsRef.get();
    const settingData = settingsSnap.data();
    settingsRef
      .set(
        {
          ...settingData,
          username: payload.username,
          userPhoto: url,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with changeUsernameAndPhoto to firestore: ",
          error
        );
      });
  } catch (error) {
    console.log("changeUsernameAndPhoto error", error);
  }
};
