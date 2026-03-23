// API ERRORS

class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        // Error class(Utilize the error)
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        // Check stack if is it avilable

        if(stack) {
           this.stack = stack; 
        } else {
            Eroor.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};