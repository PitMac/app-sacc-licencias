import Base64 from "Base64";

const decodeJWT = (chainToken) => {
  const base64Url = chainToken.split(".")[1];
  if (!base64Url) {
    return "";
  }
  const decodedValue = JSON.parse(Base64.atob(base64Url));
  return decodedValue.data;
};

const decodeJWTFechaexp = (chainToken) => {
  const base64Url = chainToken.split(".")[1];

  if (!base64Url) {
    return "";
  }
  return JSON.parse(Base64.atob(base64Url));
};

export { decodeJWT, decodeJWTFechaexp };
