export class CommonError extends Error {
    statusCode: number;

    constructor(status: number) {
        super();
        this.statusCode = status;
    }
}