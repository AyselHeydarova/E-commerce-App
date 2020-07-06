import * as firebase from "firebase";
import './firebase'


export const getData = async (category,gender) => {
    const products = [];
    try {
        const ref = firebase.firestore().collection("products")
            .where("tags", 'array-contains', category)
            .where("gender" , gender===undefined?"in":"==" , gender===undefined?["men","women"]:gender)


        const productsSnap = await ref.get();
        productsSnap.forEach((product) => {
            const data = product.data();
            products.push({
                id: product.id,
                ...data
            })
        });
    } catch (e) {
        console.log('error', e)
    }
    return products;
};
export const getOnSaleData = async (sale) => {
    const saleProducts = [];
    try {
        const ref = firebase.firestore().collection("products")
            .where("tags", 'array-contains', sale);

        const productsSnap = await ref.get();
        productsSnap.forEach((product) => {
            const data = product.data();
            saleProducts.push({
                id: product.id,
                ...data
            })
        });
    } catch (e) {
        console.log('error', e)
    }
    return saleProducts;
};
export const setUserFB = async () => {
  const data = {
    name: "aysel",
    email: "aysel.mail",
    password: "345",
  };
  try {
    const ref = firebase
      .firestore()
      .collection("users")
      .doc("12345")
      .set({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .catch((error) => {
        console.log(
          "Something went wrong with added user to firestore: ",
          error
        );
      });

    // const userSnap = await ref.get();
    // console.log("userSnap getData", userSnap);
  } catch (e) {
    console.log("error", e);
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
