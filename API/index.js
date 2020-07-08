import * as firebase from "firebase";
import "./firebase";
import fbApp from "./firebase";

export const getData = async (category, gender) => {
  const products = [];
  try {
    const ref = firebase
      .firestore()
      .collection("products")
      .where("tags", "array-contains", category)
      .where(
        "gender",
        gender === undefined ? "in" : "==",
        gender === undefined ? ["men", "women"] : gender
      );

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

export const getUsersData = async () => {
  const users = [];
  try {
    const ref = firebase.firestore().collection("users");

    const usersSnap = await ref.onSnapshot();
    usersSnap.forEach((user) => {
      const data = user.data();
      users.push({
        id: user.id,
        ...data,
      });
    });

    console.log("users reducer data", users);
  } catch (e) {
    console.log(" getUserData error", e);
  }
  return users;
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
