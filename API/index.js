import * as firebase from "firebase";
import "./firebase";
import { randomString } from "../Utils/Calculations";

export const getData = async (gender, category) => {
  const products = [];
  let ref = {};
  console.log("category", category);
  console.log("gender", gender);
  try {
    if (category === undefined) {
      ref = firebase
        .firestore()
        .collection("products")
        .where(
          "gender",
          gender === undefined ? "in" : "==",
          gender === undefined ? ["men", "women"] : gender
        );
    } else {
      console.log("else");
      ref = firebase
        .firestore()
        .collection("products")
        .where("tags", "array-contains", category)
        .where(
          "gender",
          gender === undefined ? "in" : "==",
          gender === undefined ? ["men", "women"] : gender
        );
    }
    const productsSnap = await ref.get();
    productsSnap.forEach((product) => {
      const data = product.data();
      products.push({
        id: product.id,
        ...data,
      });
    });
    console.log("products", products);
  } catch (e) {
    console.log("error", e);
  }
  return products;
};

export const getDataByCategoryGenderAndFilter = async (
  category,
  gender,
  isSortClicked,
  sortType
) => {
  const products = [];
  try {
    let ref;
    if (isSortClicked) {
      ref = firebase
        .firestore()
        .collection("products")
        .where("tags", "array-contains", category)
        .where(
          "gender",
          gender === undefined ? "in" : "==",
          gender === undefined ? ["men", "women"] : gender
        )
        .orderBy("price", sortType);
    } else {
      ref = firebase
        .firestore()
        .collection("products")
        .where("tags", "array-contains", category)
        .where(
          "gender",
          gender === undefined ? "in" : "==",
          gender === undefined ? ["men", "women"] : gender
        );
    }

    const productsSnap = await ref.get();

    productsSnap.forEach((product) => {
      const data = product.data();
      products.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log("error", e);
  }
  return products;
};

export const getOnSaleData = async (sale) => {
  const saleProducts = [];
  try {
    const ref = firebase
      .firestore()
      .collection("products")
      .where("tags", "array-contains", sale);

    const productsSnap = await ref.get();
    productsSnap.forEach((product) => {
      const data = product.data();
      saleProducts.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log("error", e);
  }
  return saleProducts;
};

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
      { merge: true }
    );
  } catch (e) {
    console.log("error", e);
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
    countData.userProductsInBag.forEach((product) => {
      console.log("payload.selectedCount", payload.selectedCount);
      if (product.id === payload.productID) {
        updatedProducts.push({
          ...product,
          selectedCount: payload.selectedCount,
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

        { merge: true }
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

export const addProductToUsersBag = (
  product,
  isFav,
  isDeleteFav,
  isDeleteBag
) => async () => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const userProductsSnap = await userProductsRef.get();
    const userData = await userProductsSnap.data();

    console.log(
      "userData.userProductsInBag in try",
      userData.userProductsInBag
    );
    if (isFav) {
      if (isDeleteFav) {
        const favs = userData.userFavorites;
        favs.push(product);
        const filteredFavs = favs.filter((item) => {
          return item.id !== product.id;
        });
        userProductsRef.set(
          {
            userFavorites: filteredFavs,
          },
          { merge: true }
        );
      } else {
        console.log(userData);

        let shouldBeAdded = true;
        shouldBeAdded = userData.userFavorites.find(
          (item) => item.id === product.id
        );
        shouldBeAdded ? null : userData.userFavorites.push(product);

        userProductsRef.set(
          {
            userFavorites: userData.userFavorites,
          },
          { merge: true }
        );
      }
    } else {
      if (isDeleteBag) {
        const bagProducts = userData.userProductsInBag;
        bagProducts.push(product);
        const filteredBagProducts = bagProducts.filter((item) => {
          if (
            item.id === product.id &&
            item.color === product.color &&
            item.size === product.size
          ) {
            return false;
          } else {
            return true;
          }
        });

        userProductsRef.set(
          {
            userProductsInBag: filteredBagProducts,
          },
          { merge: true }
        );
      } else {
        if (userData.userProductsInBag === undefined) {
          console.log(
            "userData.userProductsInBag in undefined",
            userData.userProductsInBag
          );

          const userProductsInBag = [];
          userProductsInBag.push(product);
          userProductsRef.set(
            {
              userProductsInBag,
            },
            { merge: true }
          );
        } else {
          let shouldBeAddedToBag = true;
          shouldBeAddedToBag = userData.userProductsInBag.find(
            (item) =>
              item.id === product.id &&
              item.color === product.color &&
              item.size === product.size
          );

          shouldBeAddedToBag ? null : userData.userProductsInBag.push(product);
          console.log("userData.userProductsInBag", userData.userProductsInBag);
          userProductsRef.set(
            {
              userProductsInBag: userData.userProductsInBag,
            },
            { merge: true }
          );
        }
      }
    }
  } catch (e) {
    console.log("error", e);
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
    // dispatch(addShippingAddress(payload));
  } catch (error) {
    console.log("sendReview error", error);
  }
};

export const sendReview = (payload) => async (dispatch, getState) => {
  const date = new Date(Date.now()).toLocaleString().split(",")[0];
  try {
    const reviewRef = firebase
      .firestore()
      .collection("products")
      .doc(payload.productID);

    const reviewSnap = await reviewRef.get();
    const reviewData = reviewSnap.data();

    reviewData.reviews.push({
      username: payload.username,
      userPhoto: payload.userPhoto,
      review_text: payload.review_text,
      givenRating: payload.givenRating,
      date: date,
    });

    reviewRef
      .set(
        {
          reviews: reviewData.reviews,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with added user to firestore: ",
          error
        );
      });
    // dispatch(addReview(payload));
  } catch (error) {
    console.log("sendReview error", error);
  }
};

export const increaseRating = async (payload) => {
  try {
    const ratingRef = firebase
      .firestore()
      .collection("products")
      .doc(payload.productID);

    const ratingSnap = await ratingRef.get();
    const ratingData = ratingSnap.data();

    const selectedRating = ratingData.rating[payload.givenRating - 1];
    const newValue = Object.values(selectedRating)[0] + 1;
    const key = Object.keys(selectedRating)[0];

    selectedRating[key] = newValue;

    ratingRef
      .set(
        {
          rating: ratingData.rating,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with increaseRating to firestore: ",
          error
        );
      });
  } catch (error) {
    console.log("increaseRating error", error);
  }
};
export const savePaymentCard = async (payload) => {
  try {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userRef.get();
    const userData = userSnap.data();
    console.log("userData", userData);
    userData.paymentMethods.push({
      ...payload,
    });

    userRef
      .set(
        {
          paymentMethods: userData.paymentMethods,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with added payment card to firestore: ",
          error
        );
      });
  } catch (error) {
    console.log("payment card error", error);
  }
};

export const selectPaymentCard = async (pressedIndex) => {
  try {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userRef.get();
    const userData = userSnap.data();

    userData.paymentMethods.map((payment, index) => {
      if (index === pressedIndex) {
        payment.isSelected = true;
      } else {
        payment.isSelected = false;
      }
    });
    userRef
      .set(
        {
          paymentMethods: userData.paymentMethods,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with a paymentMethods firestore: ",
          error
        );
      });
  } catch (error) {
    console.log("paymentMethods error", error);
  }
};

// let  db = firebase.firestore();
// products.forEach(function(product) {
//     db.collection("products").add({
//         // id:product.id,
//         brandName: product.brandName,
//         colors: product.colors,
//         sizes: product.sizes,
//         about: product.about,
//         count: product.count,
//         imagesUrls: product.imagesUrls,
//         tags: product.tags,
//         rating: product.rating,
//         reviews: product.reviews,
//         price: product.price,
//         name: product.name
//     })
// })
