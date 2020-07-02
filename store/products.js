import {getData, getdbData} from "../API";

const SET_APP_PRODUCTS = "SET_APP_PRODUCTS";

export const MODULE_NAME = "products";

export const selectAllProductData = (state) => state[MODULE_NAME];

export const selectCategory = (state, category) => state[MODULE_NAME].categories[category]

export const selectAllwithoutCategories = (state) => {
  const withoutCategories = [];
  for (let key in state[MODULE_NAME].categories) {
    let dividedByGender = state[MODULE_NAME].categories[key];
    for (let item in dividedByGender) {
      withoutCategories.push(...dividedByGender[item]);
    }
  }
  return withoutCategories;
};

export const selectNewProducts = (state) => {
 return  selectAllwithoutCategories(state).filter((product) => product.isNew === true);  
}

export const selectOnSale = (state) => {
  return  selectAllwithoutCategories(state).filter((product) => product.onSale.isOnSale === true);  
}

const initialState = {
  categories: {},
};
export function productsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_APP_PRODUCTS:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
}

export const setAppProducts = (payload) => ({
  type: SET_APP_PRODUCTS,
  payload,
});

export const getAllData = (value) => async (dispatch, getState) => {
  try {
    const categories = await getData(value);
    dispatch(setAppProducts(categories));
  } catch (error) {
    console.log("getAllData", error);
  }
};
