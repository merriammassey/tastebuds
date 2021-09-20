//npm install jsonwebtoken
const jwt = require("jsonwebtoken");

//If your JWT secret is ever compromised, you'll need to generate a new one, immediately invalidating all current tokens. Because the secret is so important,
//you should store it somewhere other than in a JavaScript file—like an environment variable.
const secret = "ClaireGeorgeMerriam";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    //const isCustomAuth = token.length < 500; //added
    //if (token && isCustomAuth) {
    //added
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    //} //added
    //else {
    //added
    //const token = req.headers.authorization.split(" ")[1]; //added
    // return token;//added
    //} //added
  },

  authMiddleware: function ({ req }) {
    //allows token to be sent via req.body, req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (!token) {
      return req;
    }
    //seperate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (token.length < 500) {
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        //attach user data to request object
        req.user = data;
      } catch {
        console.log("Invalid token");
        return res.status(400).json({ message: "invalid token!" });
      }
    } else {
      try {
        let decodedData;
        decodedData = jwt.decode(token);
        console.log("decodedData", decodedData);

        //get user id (sub is google's name for id)
        console.log(decodedData);
        req.user = decodedData?.sub;
      } catch {
        console.log("Invalid token");
        return res.status(400).json({ message: "invalid token!" });
      }
    }

    // return updated request object
    return req;
  },
};
