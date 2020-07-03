import * as firebase from "firebase";
import "./firebase";
// import {products} from "../DummyData/data";

// export const domain = "https://my-project-aysel.firebaseio.com/";
//
// export const getdbData = async () => {
// const allData = await fetch(`${domain}/categories.json`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((data) => data.json());

//   console.log("allData db", allData);
//   return allData;

// return allData
//   let innerData = [];

//   for (let key in allCategories) {
//     let dividedByGender = allCategories[key];
//     for (let item in dividedByGender) {
//       innerData.push(...dividedByGender[item]);
//     }
//   }
//   setAllData(innerData);
// };
export const getData = async (value) => {
  const products = [];
  try {
    const ref = firebase
      .firestore()
      .collection("products")
      .where("tags", "array-contains", `${value}`);

    const productsSnap = await ref.get();
    productsSnap.forEach((product) => {
      const data = product.data();
      products.push({
        id: product.id,
        ...data,
      });
    });
    console.log(products);
  } catch (e) {
    console.log("error", e);
  }
  return products;
};

export const filterDataByTag = async (value) => {
  const products = [];
  try {
    const ref = firebase
      .firestore()
      .collection("products")
      .where("tags", "array-contains-any", `${value}`);

    const productsSnap = await ref.get();
    productsSnap.forEach((product) => {
      const data = product.data();
      products.push({
        id: product.id,
        ...data,
      });
    });
    console.log("filterDataByTag", products);
  } catch (e) {
    console.log(" filterDataByTag error", e);
  }
  return products;
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
