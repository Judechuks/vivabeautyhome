// middleware wrapper with which we can use to handle any async function
export default (myErrorFunction) => {
  return (req, res, next) => {
    Promise.resolve(myErrorFunction(req, res, next)).catch(next); // try catch block for async functions
    // if the promise is rejected, it will call the next middleware with the error
  };
};
