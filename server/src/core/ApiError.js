export class BadRequestError extends Error{
    constructor(message = 'Bad request') {
        super(message);
        this.status = 400;
    }
}

export class NotFoundError extends Error{
    constructor(message = 'Not found error') {
        super(message);
        this.status = 404;
    }
}

export class InternalServerError extends Error{
    constructor(message = 'Internal server error') {
        super(message);
        this.status = 500;
    }
}

export class AuthenticationError extends Error{
    constructor(message = 'Authentication error') {
        super(message);
        this.status = 401;
    }
}

