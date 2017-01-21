export class AuthError extends Error {
    public static readonly ERROR_NAME: string = 'AuthenticationError';

    constructor(message?: string) {
        super(message);
        this.name = AuthError.ERROR_NAME;
        this.message = message;
    }

}
