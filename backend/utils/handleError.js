class HandleError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // where 'this' is the reference to the object that will be created from the class
  }
}

export default HandleError;
