import store from "../store";

const everything = store.getState();

export const allProducts = everything.products.categories;

export const withoutCategories = [];
for (let key in allProducts) {
    let dividedByGender = allProducts[key];
    for (let item in dividedByGender) {
      withoutCategories.push(...dividedByGender[item]);
    }
  }

export const newProducts = withoutCategories.filter(
    (product) => product.isNew === true
  );
export const onSale = withoutCategories.filter(
    (product) => product.onSale.isOnSale === true
  );
