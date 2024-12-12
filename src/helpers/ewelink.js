// const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const random = require('random');

const DEVICE_TYPE_UUID = require('../data/devices-type-uuid.json');
const DEVICE_CHANNEL_LENGTH = require('../data/devices-channel-length.json');

async function createHmacSHA256(secret, body) {
  // Convert the secret and body into Uint8Array
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const bodyData = encoder.encode(JSON.stringify(body));

  // Import the secret as a CryptoKey
  const key = await crypto.subtle.importKey(
    'raw', 
    keyData, 
    { name: 'HMAC', hash: { name: 'SHA-256' } }, 
    false, 
    ['sign']
  );

  // Sign the body data with the secret key
  const signature = await crypto.subtle.sign('HMAC', key, bodyData);

  // Convert the signature (an ArrayBuffer) to a base64 string
  const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return base64Signature;
}

const makeAuthorizationSign = createHmacSHA256

const getDeviceTypeByUiid = uiid => DEVICE_TYPE_UUID[uiid] || '';

const getDeviceChannelCountByType = deviceType =>
  DEVICE_CHANNEL_LENGTH[deviceType] || 0;

const getDeviceChannelCount = deviceUUID => {
  const deviceType = getDeviceTypeByUiid(deviceUUID);
  return getDeviceChannelCountByType(deviceType);
};

const create16Uiid = () => {
  let result = '';
  for (let i = 0; i < 16; i += 1) {
    result += random.int(0, 9);
  }
  return result;
};

const encryptionBase64 = t =>
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(t));

const decryptionBase64 = t =>
  CryptoJS.enc.Base64.parse(t).toString(CryptoJS.enc.Utf8);

const encryptationData = (data, key) => {
  const encryptedMessage = {};
  const uid = create16Uiid();
  const iv = encryptionBase64(uid);
  const code = CryptoJS.AES.encrypt(data, CryptoJS.MD5(key), {
    iv: CryptoJS.enc.Utf8.parse(uid),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  encryptedMessage.uid = uid;
  encryptedMessage.iv = iv;
  encryptedMessage.data = code.ciphertext.toString(CryptoJS.enc.Base64);
  return encryptedMessage;
};

const decryptionData = (data, key, iv) => {
  const iv64 = decryptionBase64(iv);
  const code = CryptoJS.AES.decrypt(data, CryptoJS.MD5(key), {
    iv: CryptoJS.enc.Utf8.parse(iv64),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return code.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  makeAuthorizationSign,
  getDeviceChannelCount,
  encryptationData,
  decryptionData,
};
