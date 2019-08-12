import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Latin1.parse('1234567891234545');
const iv = CryptoJS.enc.Latin1.parse('1234567891234567');

//解密方法
function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
function Encrypt (word) {
  let encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC });
  return encrypted
}

export default {
  Decrypt,
  Encrypt
}