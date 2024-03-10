class BadRequest extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number = 403) {
      super(message);
      this.statusCode = statusCode;
    }
}

class InteralError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

type CustomerError = BadRequest | InteralError;

export { BadRequest, InteralError, CustomerError };