import * as firebase from "firebase";
import "firebase/firestore";
import {getUsersData} from "../API";
import {randomString} from "../Utils/Calculations";

const SET_AUTH_DATA = "SET_AUTH_DATA";
export const MODULE_NAME = "users";
export const selectUsers = (state) => state[MODULE_NAME];
export const selectCount = (state) => state[MODULE_NAME].count;
export const selectUsernameByID = (state, ID) =>
    state[MODULE_NAME].filter((user) => user.id === ID).username;

export const selectUserData = (state) => state[MODULE_NAME].usersData;


export const setAuthData = (payload) => ({
    type: SET_AUTH_DATA,
    payload,
});

export const addProductToUsersBag = (product, isFav, isDeleted) => async () => {
    try {
        const userProductsRef = firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
        const userProductsSnap = await userProductsRef.get();
        const userData = await userProductsSnap.data();
        if (isFav) {
            console.log(userData.userFavorites)
            userData.userFavorites.forEach((item) => {
                console.log('item.id', item.id)
                console.log('product.id', product.id)
                if (item.id !== product.id) {
                    userData.userFavorites.push(product);
                }
            });
            userProductsRef.set({
                    userFavorites: userData.userFavorites,
                },
                {merge: true})


        } else {
            if (userData.userProductsInBag === undefined) {
                const userProductsInBag = [];
                userProductsInBag.push(product)
                console.log('userProductsInBag',userProductsInBag)
                userProductsRef.set({
                        userProductsInBag
                    },
                    {merge: true})
            } else {
                userData.userProductsInBag.push(product);
                console.log('userData.userProductsInBag', userData.userProductsInBag)
                userProductsRef.set({
                        userProductsInBag: userData.userProductsInBag,
                    },
                    {merge: true})
            }
        }
    } catch (e) {
        console.log('error', e)
    }

};
export const deleteBagProducts = () => {
    try {


        const userProductsRef = firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);

        userProductsRef.update({
            userProductsInBag: firebase.firestore.FieldValue.delete()
        });
    } catch (e) {
        console.log('deleteBagProducts', e)
    }
    // return removeBagProducts;
};
export const addOrderedProducts = (products) => async () => {
    try {
        const date = new Date(Date.now()).toLocaleString().split(',')[0];
        const userProductsRef = firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
        const userProductsSnap = await userProductsRef.get();
        const userData = await userProductsSnap.data();
        console.log('userData', userData);
        console.log('length', products.length);
        const totalAmount = () => {
            let total = 0;
            products.forEach((product) => {
                total = total + product.price * product.selectedCount
            });
            return total;
        };
        userData.orders.push({
            orderNo: randomString(7, 'n'),
            trackingNo: randomString(12),
            quantity: products.length,
            totalAmount: totalAmount(),
            date: date,
            orderedProducts: products,

        });
        userProductsRef.set({
                orders: userData.orders,
            },
            {merge: true})
    } catch (e) {
        console.log('error', e)
    }

};

export const getCurrentUserData = () => async (dispatch) => {
    try {
        // const userProductsRef =
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(function (doc) {
                console.log(doc.data(), 'doc.data()')
                dispatch(setAuthData(doc.data()));
            });
        // const userProductsSnap = await userProductsRef.get();
        // const userData = await userProductsSnap.data();

        console.log('currentUserData', currentUserData)
    } catch (e) {
        console.log('error', e)
    }

};
export const submitOrder = async (orderInfo) => {
    const orderId = await firebase
        .firestore
        .collection('orders')
        .push(orderInfo).id;
    console.log('orderId', orderId);
    firebase
        .firestore
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .orders
        .set({
            [orderId]: true
        })

}
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


const initialState = {
    usersData: {},
    count: 0,
};


export function usersReducer(state = initialState, {type, payload}) {
    switch (type) {
        case SET_USERS:
            return [...state, ...payload];
        case SET_AUTH_DATA:
            return {
                usersData: payload,
            };
        case SET_COUNT:
            return {

                count: payload.count,
                id: payload.id

            };

        default:
            return state;
    }
}

export const setUsersData = () => async (dispatch, getState) => {
    try {
        const users = await getUsersData();
        dispatch(setUsers(users));

        console.log("SetUsersData", users);
    } catch (error) {
        console.log("setUsersData", error);
    }
};
export const setCountSize = async (payload) => {
    try {
        const countRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)


        const countSnap = await countRef.get();
        const countData = countSnap.data();
        const updatedProducts = []
        console.log("payload", payload);
        console.log("countData", countData);
        countData.userProductsInBag.forEach((product) => {
            if (product.id === payload.productID) {
                updatedProducts.push({
                    ...product,
                    selectedCount: payload.selectedCount + 1
                })
            } else {
                updatedProducts.push(product)
            }
        });
        console.log('updatedProducts', updatedProducts)


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

