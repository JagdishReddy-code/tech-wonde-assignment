import { HttpException } from '@nestjs/common';

/**
 * Thrown if an authentication request is rejected because the account is disabled. Makes no assertion as to
 * whether or not the credentials were valid.
 *
 * @author Jagdish Reddy
 */
export class DisabledException extends HttpException {

    constructor(message: string, errorCode: number) {
        super(message, errorCode);
    }

}
