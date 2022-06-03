const notFound = (req, res, next) => {
  //if the url is wrong
  const error = new Error("Not Found-" + req.originalUrl);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  //if even after the wrong url returns error then this function
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
