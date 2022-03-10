class ExpressError extends Error {
    constructor(message, err) {
        super();
        this.message = message
        this.err = err
    }
}

export default ExpressError;