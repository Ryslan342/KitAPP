class NotFoundError extends Error{
    constructor(className) {
        super();

        this.message = `${className} not fount`;
    }

    get type() {
        return "NOT_FOUND_ERROR";
    }
}

class InvalidPasswordError extends  Error{
    constructor() {
        super();
    }

    get type() {
        return "INVALID_PASSWORD_ERROR";
    }
}

class BalanceError extends Error {
    constructor() {
        super();
        this.message = "Not enough money";
    }

    get type() {
        return "BALANCE_ERROR"
    }
}

module.exports = {
    NotFoundError,
    InvalidPasswordError,
    BalanceError
};
