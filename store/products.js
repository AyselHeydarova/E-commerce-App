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
const TOGGLE_MODAL = "TOGGLE_MODAL";

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

export const selectIsModalOpen = (state) => state[MODULE_NAME].isModalOpen;

const initialState = {
  isModalOpen: true,
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

    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: payload,
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

export const setCurrentProduct = (payload) => ({
  type: SET_CURRENT_PRODUCT,
  payload,
});
export const setAppNewProducts = (payload) => ({
  type: SET_APP_NEW_PRODUCTS,
  payload,
});

export const toggleModal = (payload) => ({
  type: TOGGLE_MODAL,
  payload,
});

export const getAllData = (gender, category) => async (dispatch, getState) => {
  try {
    const allProducts = await getData(gender, category);
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
        console.log("getCurrentProduct redux", doc.data());
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
      // payload.isSortClicked,
      payload.sortType
    );
    console.log("payload", payload);
    console.log("filteredProducts from redux", filteredProducts);
    dispatch(setFilteredProducts(filteredProducts));
  } catch (error) {
    console.log("getFilteredProducts error ", error);
  }
};
