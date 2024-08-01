export class CommoneError extends Error {
    statusCode: number;

    constructor(status: number) {
        super();
        this.statusCode = status;
    }
}