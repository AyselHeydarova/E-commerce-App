import * as firebase from "firebase";
import './firebase'


export const getData = async (category="isNew") => {
    const products = [];
    try {
        const ref = firebase.firestore().collection("products")
            .where("tags", 'array-contains', "isNew");
        //   .where(`${gender}`,'in',["new","women"]   );
        //    .where("tags",'array-contains', `${gender}`);

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