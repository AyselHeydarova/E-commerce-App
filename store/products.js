import {getData, getOnSaleData} from "../API";

const SET_APP_PRODUCTS = "SET_APP_PRODUCTS";
const SET_APP_SALE_PRODUCTS = "SET_APP_SALE_PRODUCTS";
const SET_APP_NEW_PRODUCTS = "SET_APP_NEW_PRODUCTS";
const ADD_TO_BAG = "ADD_TO_BAG";

export const MODULE_NAME = "products";

export const selectAllProductData = (state) => state[MODULE_NAME];
export const selectSaleProductData = (state) => state[MODULE_NAME].saleProducts;
export const selectNewProductData = (state) => state[MODULE_NAME].newProducts;

export const selectCategory = (state, category) =>
    state[MODULE_NAME].categories[category];

const initialState = {
    categories: [],
    saleProducts: [],
    newProducts: [],
    bagProducts: [],
};

export function productsReducer(state = initialState, {type, payload}) {
    console.log(state.categories)
    switch (type) {
        case SET_APP_PRODUCTS:
            return {
                ...state,
                categories: payload,
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
                bagProducts:state.categories.products.map((product) => {
          if (product.id === payload.productID) {
              return {
                  ...product,
                  isBought: !product.isBought,
              };
          }
          return product;
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

export const getAllData = (category, gender) => async (dispatch, getState) => {
    try {
        const categories = await getData(category, gender);
        dispatch(setAppProducts(categories));
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
        console.log('saleData', saleData)
        dispatch(setAppSaleProducts(saleData));
    } catch (error) {
        console.log("getOnSaleProducts", error);
    }
};
