import { HttpException } from '@nestjs/common';

/**
 * Thrown if an authentication request is rejected because the credentials are invalid. For this exception to be
 * thrown, it means the account is neither locked nor disabled.
 *
 * @author Jagdish Reddy
 */
export class BadCredentialsException extends HttpException {

    constructor(message: string, errorCode: number) {
        super(message, errorCode);
    }

}