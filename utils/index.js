import Cookies from "universal-cookie";
let EXPIRY_TIME = 30 * 24 * 60 * 60;
export const expireTime = () => new Date(Date.now() + EXPIRY_TIME * 1000);
const cookies = new Cookies();

export const setCookie = (key, data, expiry) => {
  if (key && data) {
    // let ciphertext = this.encryption(data);
    let ciphertext = data;

    cookies.set(key, ciphertext, {
      path: "/",
      expires: expiry ?? expireTime(),
    });
  }
};

export const getCookie = (key) => {
  // const data = cookies.get(key);
  // let decryptedData = data ? this.decryption(data) : null;
  // return decryptedData;
  return cookies.get(key);
};

export const removeCookie = (key) => {
  if (key) {
    cookies.remove(key, { path: "/", expires: expireTime() });
  }
};