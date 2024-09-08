class ApiResponse{
    constructor(statusCode, data, statusMessage= "Success")
    {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.data = data;

        this.success= statusCode<400;
    }
};

export {ApiResponse};