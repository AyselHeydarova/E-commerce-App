import * as firebase from "firebase";
import "firebase/firestore";
import {getUsersData} from "../API";
import {randomString} from "../Utils/Calculations";

export const MODULE_NAME = "users";

export const selectUsers = (state) => state[MODULE_NAME];
export const selectCount = (state) => state[MODULE_NAME].count;
export const selectUserData = (state) => state[MODULE_NAME].usersData;
export const selectCurrentUserShippingAddresses = (state) =>
    state[MODULE_NAME].usersData.shippingAddresses;

const SET_AUTH_DATA = "SET_AUTH_DATA";
const ADD_SHIPPING_ADDRESS = "ADD_SHIPPING_ADDRESS";
const SET_USERS = "SET_USERS";
const SET_COUNT = "SET_COUNT";

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});
export const setCount = (payload) => ({
  type: SET_COUNT,
  payload,
});

export const addProductToUsersBag = (product, isFav, isDeleteFav, isDeleteBag,) => async () => {
  try {
    const userProductsRef = firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
    const userProductsSnap = await userProductsRef.get();
    const userData = await userProductsSnap.data();
    if (isFav) {
      if (isDeleteFav) {
        const favs = userData.userFavorites;
        favs.push(product);
        const filteredFavs = favs.filter((item) => {
          return item.id !== product.id
        });
        userProductsRef.set({
              userFavorites: filteredFavs,
            },
            {merge: true})
      } else {
        console.log(userData)

        let shouldBeAdded = true;
        shouldBeAdded = userData.userFavorites.find(item => item.id === product.id)
        shouldBeAdded ? null : userData.userFavorites.push(product)

        userProductsRef.set({
              userFavorites: userData.userFavorites,
            },
            {merge: true})
      }
    } else {
      if (isDeleteBag) {
        const bagProducts = userData.userProductsInBag;
        bagProducts.push(product);
        const filteredBagProducts = bagProducts.filter((item) => {

          if(item.id === product.id && item.color === product.color && item.size === product.size) {
            return false;
          }
          else {
            return true;
          }

        });

        userProductsRef.set({
              userProductsInBag: filteredBagProducts,
            },
            {merge: true})
      } else {
        if (userData.userProductsInBag === undefined) {
          const userProductsInBag = [];
          userProductsInBag.push(product)
          userProductsRef.set({
                userProductsInBag
              },
              {merge: true})
        } else {
          let shouldBeAddedToBag = true;
          shouldBeAddedToBag = userData.userProductsInBag.find(
              item => (item.id === product.id && (item.color === product.color && item.size === product.size))
          );

          shouldBeAddedToBag ? null : userData.userProductsInBag.push(product);
          // userData.userProductsInBag.push(product);
          userProductsRef.set({
                userProductsInBag: userData.userProductsInBag,
              },
              {merge: true})
        }
      }
    }
  } catch (e) {
    console.log('error', e)
  }

}


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
  count: 0,
};
export function usersReducer(state = initialState, {type, payload}) {
  switch (type) {
    case SET_USERS:
      return [...state, ...payload];

    case SET_COUNT:
      return {
        count: payload.count,
        id: payload.id,
      };
    case SET_AUTH_DATA:
      return {
        ...state,
        usersData: payload,
      };
      // FIX shipping redux________________

    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        usersData: [...state.usersData, {shippingAddresses: payload}],
      };

    default:
      return state;
  }
}

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

            {merge: true}
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

// ________________________________________________________________________________
// // FIRESTORE ACTIONS -- WE SHOULD MOVE THEM TO ANOTHER FILE , MAYBE INSIDE API
// _________________________________________________________________________________

export const deleteBagProducts = () => {
  try {
    const userProductsRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

    userProductsRef.update({
      userProductsInBag: firebase.firestore.FieldValue.delete(),
    });
  } catch (e) {
    console.log("deleteBagProducts", e);
  }
  // return removeBagProducts;
};

export const addOrderedProducts = (products) => async () => {
  try {
    const date = new Date(Date.now()).toLocaleString().split(",")[0];
    const userProductsRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
    const userProductsSnap = await userProductsRef.get();
    const userData = await userProductsSnap.data();
    console.log("userData", userData);
    console.log("length", products.length);
    const totalAmount = () => {
      let total = 0;
      products.forEach((product) => {
        total = total + product.price * product.selectedCount;
      });
      return total;
    };
    userData.orders.push({
      orderNo: randomString(7, "n"),
      trackingNo: randomString(12),
      quantity: products.length,
      totalAmount: totalAmount(),
      date: date,
      orderedProducts: products,
    });
    userProductsRef.set(
        {
          orders: userData.orders,
        },
        {merge: true}
    );
  } catch (e) {
    console.log("error", e);
  }
};

// export const addProductToUsersBag = (product) => async () => {
//   try {
//     const userProductsRef = firebase
//       .firestore()
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid);
//     const userProductsSnap = await userProductsRef.get();
//     const userData = await userProductsSnap.data();
//     userData.userProductsInBag.push(product);
//     userProductsRef.set(
//       {
//         userProductsInBa g: userData.userProductsInBag,
//       },
//       { merge: true }
//     );
//   } catch (e) {
//     console.log("error", e);
//   }
// };
// export const submitOrder = async (orderInfo) => {
//   const orderId = await firebase.firestore.collection("orders").push(orderInfo)
//     .id;
//   console.log("orderId", orderId);
//   firebase.firestore
//     .collection("users")
//     .doc(firebase.auth().currentUser.uid)
//     .orders.set({
//       [orderId]: true,
//     });
// };

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

            {merge: true}
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

            {merge: true}
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
export const setCountSize = async (payload) => {
  try {
    const countRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

    const countSnap = await countRef.get();
    const countData = countSnap.data();
    const updatedProducts = [];
    console.log("payload", payload);
    console.log("countData", countData);
    countData.userProductsInBag.forEach((product) => {
      if (product.id === payload.productID) {
        updatedProducts.push({
          ...product,
          selectedCount: payload.selectedCount + 1,
        });
      } else {
        updatedProducts.push(product);
      }
    });
    console.log("updatedProducts", updatedProducts);

    countRef
        .set(
            {
              userProductsInBag: updatedProducts,
            },

            {merge: true}
        )
        .catch((error) => {
          console.log(
              "Something went wrong with added user to firestore: ",
              error
          );
        });
    // dispatch(addReview(payload));
  } catch (error) {
    console.log("countData error", error);
  }
};