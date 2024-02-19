export const getUserInfo = (jwt) => JSON.parse(atob(jwt.split(".")[1])).sub;
