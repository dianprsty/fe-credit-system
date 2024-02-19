/**
 *
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return `${day}-${month}-${year}`;
};
