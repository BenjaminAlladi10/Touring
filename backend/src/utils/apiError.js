class ApiError extends Error{
    constructor(statusCode, errorMessage= "something went wrong", errors=[], stack="")
    {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.data= "";

        this.success= false;
        this.errors= errors;

        if(stack)
        {
            this.stack= stack;
        }
        else
        {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

export {ApiError};