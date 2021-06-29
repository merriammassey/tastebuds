const JWT = require("jsonwebtoken");
const SECRETS = require("./config");

var now = Math.round(new Date().getTime() / 1000);
var later = now + 120;
const payload = {
  iss: SECRETS.YELP_API_KEY,
  ist: "project",
  iat: now,
  exp: later,
};

const getHeaders = () => {
  //const token = JWT.sign(payload, SECRETS.YELP_API_SECRET);
  const headers = {
    "X-YELP-AUTH": token,
  };
  return headers;
};

module.exports = getHeaders;
