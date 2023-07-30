const info = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  info("Method: ", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("---");
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = (request, response, next) => {
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  request.user = decodedToken;

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.message === "jwt must be provided") {
    return response
      .status(403)
      .json({ error: "jwt token missing or not provided" });
  }

  next();
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  errorHandler,
};
