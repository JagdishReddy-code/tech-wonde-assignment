import { HttpException } from '@nestjs/common';

/**
 * Defines a common exception which can be thrown if any database operation couldn't be successfully completed.
 *
 * @author Jagdish Reddy
 */
export class DatabaseFailedException extends HttpException {

    constructor(message: string, errorCode: number) {
        super(message, errorCode);
    }

}