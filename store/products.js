import {getData, getdbData} from "../API";

const SET_APP_PRODUCTS = "SET_APP_PRODUCTS";

export const MODULE_NAME = "products";

export const getAllProductData = (state) => state[MODULE_NAME]; 
export const getAllProductDataCat = (state) => state[MODULE_NAME].categories; 


//   for (let key in allCategories) {
//     let dividedByGender = allCategories[key];
//     for (let item in dividedByGender) {
//       innerData.push(...dividedByGender[item]);
//     }
//   }
//   setAllData(innerData);

const initialState = {
    categories: {}
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

export const getAllData = (value="isNew") => async (dispatch, getState) => {
  try {
    const categories = await getData(value);
    dispatch(setAppProducts(categories));
  } catch (error) {
    console.log("getAllData", error);
  }
};
