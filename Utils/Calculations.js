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
