import * as firebase from "firebase";
import "firebase/firestore";

import {
  getData,
  getOnSaleData,
  getDataByCategoryGenderAndFilter,
} from "../API";

const SET_APP_PRODUCTS = "SET_APP_PRODUCTS";
const SET_APP_SALE_PRODUCTS = "SET_APP_SALE_PRODUCTS";
const SET_APP_NEW_PRODUCTS = "SET_APP_NEW_PRODUCTS";
const SET_FILTERED_PRODUCTS = "SET_FILTERED_PRODUCTS";
const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT";
const ADD_TO_BAG = "ADD_TO_BAG";
const ADD_REVIEW = "ADD_REVIEW";

export const MODULE_NAME = "products";


export const selectAllProductData = (state) => state[MODULE_NAME];
export const selectSaleProductData = (state) => state[MODULE_NAME].saleProducts;
export const selectNewProductData = (state) => state[MODULE_NAME].newProducts;
export const selectFilteredProducts = (state) =>
  state[MODULE_NAME].filteredProducts;
export const selectCurrentProduct = (state) =>
    state[MODULE_NAME].currentProduct;
export const selectCurrentProductRating = (state) =>
    state[MODULE_NAME].currentProduct.rating;

export const selectCategory = (state, category) =>
    state[MODULE_NAME].allProducts[category];

const initialState = {
  currentProduct: [],
  filteredProducts: [],
  allProducts: [],
  saleProducts: [],
  newProducts: [],
};

export function productsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_APP_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };

    case SET_APP_NEW_PRODUCTS:
      return {
        ...state,
        newProducts: payload,
      };

    case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: payload,
      };

    case SET_APP_SALE_PRODUCTS:
      return {
        ...state,
        saleProducts: payload,
      };

    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: payload,
      };

    case ADD_REVIEW:
      return {
        ...state,
        newProducts: state.newProducts.map((product) => {
          if (product.id === payload.productID) {
            return {
              ...product,
              reviews: [
                ...product.reviews,
                {
                  username: payload.username,
                  userPhoto: payload.userPhoto,
                  review_text: payload.review_text,
                  givenRating: payload.givenRating,
                },
              ],
            };
          } else {
            return product;
          }
        }),
      };
    default:
      return state;
  }
}

export const setAppProducts = (payload) => ({
  type: SET_APP_PRODUCTS,
  payload,
});
export const setAppSaleProducts = (payload) => ({
  type: SET_APP_SALE_PRODUCTS,
  payload,
});
export const setFilteredProducts = (payload) => ({
  type: SET_FILTERED_PRODUCTS,
  payload,
});
export const setAppNewProducts = (payload) => ({
  type: SET_APP_NEW_PRODUCTS,
  payload,
});
export const setAddToBag = (payload) => ({
  type: ADD_TO_BAG,
  payload,
});

export const addReview = (payload) => ({
  type: ADD_REVIEW,
  payload,
});

export const sendReview = (payload) => async (dispatch, getState) => {
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
    dispatch(addReview(payload));
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

export const getAllData = (category, gender) => async (dispatch, getState) => {
  try {
    const allProducts = await getData(category, gender);
    dispatch(setAppProducts(allProducts));
  } catch (error) {
    console.log("getAllData", error);
  }
};
export const getNewData = (isNew) => async (dispatch, getState) => {
  try {
    const newProducts = await getOnSaleData(isNew);
    console.log(newProducts);
    dispatch(setAppNewProducts(newProducts));
  } catch (error) {
    console.log("getNewData", error);
  }
};
export const getOnSaleProducts = (sale) => async (dispatch, getState) => {
  try {
    const saleData = await getOnSaleData(sale);
    console.log("saleData", saleData);
    dispatch(setAppSaleProducts(saleData));
  } catch (error) {
    console.log("getOnSaleProducts", error);
  }
};

export const getCurrentProduct = (productID) => async (dispatch) => {
  try {
    firebase
      .firestore()
      .collection("products")
      .doc(productID)
      .onSnapshot(function (doc) {
        dispatch(setCurrentProduct(doc.data()));
      });
  } catch (e) {
    console.log("getCurrentProduct error", e);
  }
};

export const getFilteredProducts = (payload) => async (dispatch) => {
  try {
    const filteredProducts = await getDataByCategoryGenderAndFilter(
      payload.category,
      payload.gender,
      payload.sortBy,
      payload.sortType
    );
    console.log("filteredProducts from redux", filteredProducts);
    dispatch(setFilteredProducts(filteredProducts));
  } catch (error) {
    console.log("getFilteredProducts error ", error);
  }
};
