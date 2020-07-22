import * as firebase from "firebase";
import "firebase/firestore";

const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const SET_AUTH_LOGOUT = "SET_AUTH_LOGOUT";
const SET_AUTH_PHOTO = "SET_AUTH_PHOTO";

export const MODULE_NAME = "auth";
export const selectAuthStatus = (state) => state[MODULE_NAME].status;
export const selectAuthUserID = (state) => state[MODULE_NAME].userID;
export const selectAuthUsername = (state) => state[MODULE_NAME].username;
export const selectAuthPhoto = (state) => state[MODULE_NAME].photo;

// ACTION CREATORS
export const setAuthSuccess = (payload) => ({
  type: SET_AUTH_SUCCESS,
  payload,
});
export const setAuthPhoto = (payload) => ({
  type: SET_AUTH_PHOTO,
  payload,
});
export const setAuthLogout = () => ({
  type: SET_AUTH_LOGOUT,
});

const initialState = [
  {
    status: false,
    userID: null,
    username: null,
  },
];
export function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        status: true,
        userID: payload.userID,
        username: payload.username,
      };
    case SET_AUTH_LOGOUT:
      return {
        ...state,
        status: false,
        userID: null,
        username: null,
      };
    case SET_AUTH_PHOTO:
      return {
        ...state,
        photo: payload,
      };
    default:
      return state;
  }
}

export const signupUser = (userDetails) => async (dispatch) => {
  const { username, email, password } = userDetails;

  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const { currentUser } = await firebase.auth();
        let userUid = currentUser.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(userUid)
          .set({
            username: username,
            email: email,
            userFavorites: [],
            userProductsInBag: [],
            shippingAddresses: [],
            orders: [],
            paymentMethods: [],
          })
          .catch((error) => {
            console.log(
              "Something went wrong with added user to firestore: ",
              error
            );
          });

        dispatch(
          setAuthSuccess({
            userID: userUid,
            username,
          })
        );
      });
  } catch (error) {
    console.log("Something went wrong with sign up: ", error);
  }
};

export const signIn = (userDetails) => async (dispatch) => {
  const { username, email, password } = userDetails;
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        const { currentUser } = await firebase.auth();
        let userUid = currentUser.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(userUid)
          .get()
          .then(function (doc) {
            console.log("userDattaaa", doc.data());
          });

        dispatch(
          setAuthSuccess({
            userID: userUid,
            username,
          })
        );
      });
  } catch (error) {
    console.log("signIN error", error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const logout = await firebase.auth().signOut();
    dispatch(setAuthLogout(logout));
  } catch (error) {
    console.log(error.message);
  }
};
