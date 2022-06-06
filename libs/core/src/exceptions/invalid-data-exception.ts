/**
 * Defines a common exception which can be thrown at any place where the incoming data is wrong.
 *
 * @author Jagdish Reddy
 */
import { HttpException } from '@nestjs/common';

export class InvalidDataException extends HttpException {

    constructor(message: string, errorCode?: number) {
        super(message, errorCode);
    }

}
