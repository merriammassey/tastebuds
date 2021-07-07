//npm install jsonwebtoken
const jwt = require("jsonwebtoken");

//If your JWT secret is ever compromised, you'll need to generate a new one, immediately invalidating all current tokens. Because the secret is so important,
//you should store it somewhere other than in a JavaScript file—like an environment variable.
const secret = "ClaireGeorgeMerriam";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function ({ req }) {
    //allows token to be sent via req.body, req.query or headers
    let token = req.query.token || req.headers.authorization;

    //seperate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // if no token, return request oject as is
    if (!token) {
      return req;
    }
    //We don't want an error thrown on every request, though. Users with an invalid token should still be able to request and see all thoughts.
    //Thus, we wrapped the verify() method in a try...catch statement to mute the
    try {
      //decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "invalid token!" });
    }

    // return updated request object
    return req;
  },
};
