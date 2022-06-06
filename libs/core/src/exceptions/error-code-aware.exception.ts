import { HttpException } from '@nestjs/common';

export abstract class ErrorCodeAwareException extends HttpException {

    readonly errorCode: number;

    protected constructor(message: string, errorCode: number) {
        super(message, errorCode);
        this.errorCode = errorCode;
    }

}
