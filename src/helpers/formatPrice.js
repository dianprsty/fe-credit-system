/**
 *
 * @param {number | string} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  price = price.toString();
  let result = [];
  for (let index = price.length - 1; index >= 0; index--) {
    result.unshift(price[index]);
    if ((price.length - index) % 3 == 0) result.unshift(".");
  }

  return "Rp " + result.join("");
};
