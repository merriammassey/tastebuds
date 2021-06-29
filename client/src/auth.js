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

const token =
  "LhPwa5pQMDo4DVNiUSePZ5L0Ge_Qof4n3cXJNWdfW1kw0-O6PzbebTK78f-nuEcNACakrZSDWLYYBxi-gAj7Yk7zSazSRnIXn7QOtV0KEkV7ca9F2djgWWzF-gjWYHYx";
const getHeaders = () => {
  //const token = JWT.sign(payload, SECRETS.YELP_API_SECRET);
  const headers = {
    "X-YELP-AUTH": token,
  };
  return headers;
};

module.exports = getHeaders;
