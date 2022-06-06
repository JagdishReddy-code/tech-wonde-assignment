import { HttpException } from '@nestjs/common';

/**
 * Defines a common exception which can be thrown if any operation couldn't be successfully completed.
 *
 * @author Jagdish Reddy
 */
export class OperationFailedException extends HttpException {

    constructor(message: string, errorCode?: number ) {
        super(message, errorCode);
    }

}