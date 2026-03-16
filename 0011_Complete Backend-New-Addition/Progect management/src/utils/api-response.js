// API RISPONSE

class ApiResponse{
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = messagethis.success = statusCode < 400;
    }
}

export { ApiResponse };
