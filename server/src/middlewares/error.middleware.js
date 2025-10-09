export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle invalid MongoDB ObjectId (CastError)
  if (err.name === "CastError") {
    message = `Resource not found: Invalid ${err.path}`;
    statusCode = 400; // Bad Request
  }

  // Handle duplicate key errors (like email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    message = `Duplicate field value entered for: ${field}`;
    statusCode = 409; // Conflict
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Validation Error: ${errors.join(", ")}`;
    statusCode = 422; // Unprocessable Entity
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token, please login again";
    statusCode = 401; // Unauthorized
  }

  // Handle expired JWT tokens
  if (err.name === "TokenExpiredError") {
    message = "Your session has expired, please login again";
    statusCode = 401;
  }

  // Handle missing authentication
  if (err.name === "UnauthorizedError") {
    message = "Not authorized to access this resource";
    statusCode = 401;
  }

  // Handle forbidden access
  if (err.name === "ForbiddenError") {
    message = "Access denied";
    statusCode = 403;
  }

  // Handle resource not found (custom)
  if (statusCode === 404) {
    message = message || "Resource not found";
  }

  // Handle rate limit or too many requests
  if (err.name === "RateLimitError") {
    message = "Too many requests, please try again later";
    statusCode = 429; // Too Many Requests
  }

  // Default Internal Server Error
  if (!statusCode || statusCode >= 500) {
    statusCode = 500;
    message = message || "Internal Server Error";
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    // Include stack only in dev
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
