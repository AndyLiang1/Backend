export class ProjectError extends Error {
    statusCode: number
    message: string
    cause: any

    constructor({ statusCode, message, cause }: { statusCode: number; message: string; cause?: any }) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.cause = cause;
    }
}
