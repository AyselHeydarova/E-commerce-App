import * as firebase from "firebase";
// import "./firebase";

import { getData, getOnSaleData } from "../API";

const SET_APP_PRODUCTS = "SET_APP_PRODUCTS";
const SET_APP_SALE_PRODUCTS = "SET_APP_SALE_PRODUCTS";
const SET_APP_NEW_PRODUCTS = "SET_APP_NEW_PRODUCTS";
const ADD_TO_BAG = "ADD_TO_BAG";
const ADD_REVIEW = "ADD_REVIEW";

export const MODULE_NAME = "products";

export const selectAllProductData = (state) => state[MODULE_NAME];
export const selectSaleProductData = (state) => state[MODULE_NAME].saleProducts;
export const selectNewProductData = (state) => state[MODULE_NAME].newProducts;
export const selectProductReviews = (state, ID) =>
  state[MODULE_NAME].newProducts.filter((product) => product.id === ID).reviews;

export const selectCategory = (state, category) =>
  state[MODULE_NAME].allProducts[category];

const initialState = {
  allProducts: [],
  saleProducts: [],
  newProducts: [],
  bagProducts: [],
};

export function productsReducer(state = initialState, { type, payload }) {
  console.log(state.allProducts);
  switch (type) {
    case SET_APP_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };
    case SET_APP_SALE_PRODUCTS:
      return {
        ...state,
        saleProducts: payload,
      };

    case SET_APP_NEW_PRODUCTS:
      return {
        ...state,
        newProducts: payload,
      };

    case ADD_TO_BAG:
      return {
        ...state,
        bagProducts: state.allProducts.products.map((product) => {
          if (product.id === payload.productID) {
            return {
              ...product,
              isBought: !product.isBought,
            };
          }

          return product;
        }),
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
                  authorID: payload.authorID,
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
      authorID: payload.authorID,
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
