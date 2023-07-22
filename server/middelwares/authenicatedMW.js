const jwt = require("jsonwebtoken");
const verifyToken = (request, response, next) => {
  //check if the request ahs token
  // console.log(request.headers.authorization);
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) {
        let error = new Error("Token is not valid.!");
        error.status = 403;
        // next(error);
        // response.status(403).json("Token is not valid!");
        throw error;
      } else {
        request.accessToken = user;
        // console.log(request.accessToken);
        next();
      }
    });
  } else {
    let error = new Error("you are not authenticated.!");
    error.status = 401;
    // next(error);
    throw error;
  }
};
const isAdmin = (request, repsone, next) => {
  verifyToken(request, repsone, () => {
    if (request.accessToken.isAdmin) next();
    else {
      let error = new Error("not Authorized..!");
      error.status = 403;
      throw error;
    }
  });
};

const verifyTokenAndAuthorization = (request, respsone, next) => {
  verifyToken(request, respsone, () => {
    if (
      request.accessToken._id === request.params.id ||
      request.accessToken._id === request.params.userId ||
      request.accessToken._id === request.body.userId ||
      request.accessToken.isAdmin
    ) {
      next();
    } else {
      let error = new Error("not Authorized...!");
      error.status = 403;
      throw error;
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  isAdmin,
};
