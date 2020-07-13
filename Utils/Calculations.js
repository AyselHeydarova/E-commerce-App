export function averageRatingCalc(rating) {
  const allRatingsArray = rating.map((obj) => {
    for (let key in obj) {
      const value = obj[key];
      return value;
    }
  });
  const totalRatingCount = allRatingsArray.reduce(function (a, b) {
    return a + b;
  });
  let totalStarCount = 0;
  for (let i = 0; i <= 4; i++) {
    totalStarCount += allRatingsArray[i] * (i + 1);
  }
  const averageRating =
    Math.round((totalStarCount / totalRatingCount) * 10) / 10;

  return averageRating;
}

export function totalRatingCalc(rating) {
  const allRatingsArray = rating.map((obj) => {
    for (let key in obj) {
      const value = obj[key];
      return value;
    }
  });
  const totalRatingCount = allRatingsArray.reduce(function (a, b) {
    return a + b;
  });

  return totalRatingCount;
}
export function randomString(len, an) {
  an = an && an.toLowerCase();
  let str = "",
      i = 0,
      min = an == "a" ? 10 : 0,
      max = an == "n" ? 10 : 62;
  for (; i++ < len;) {
    let r = Math.random() * (max - min) + min << 0;
    str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
  }
  return str;
}
export  const totalAmount = (products) => {
  let total = 0;
  products.forEach((product) => {
    total = total + product.price * product.selectedCount
  });
  return total;
};