export const domain = "https://my-project-aysel.firebaseio.com/";

export const getdbData = async () => {
const allData = await fetch(`${domain}/categories.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());


return allData
//   let innerData = [];

//   for (let key in allCategories) {
//     let dividedByGender = allCategories[key];
//     for (let item in dividedByGender) {
//       innerData.push(...dividedByGender[item]);
//     }
//   }
//   setAllData(innerData);
};
