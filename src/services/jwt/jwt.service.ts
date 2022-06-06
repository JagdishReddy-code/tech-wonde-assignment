import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Account } from '@lib/core/schemas/account/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { BadCredentialsException } from '@lib/web-core/exceptions/auth/bad-credentials.exception';
import { ConfigService } from '@nestjs/config';

/**
 * @description JWT service, defined all method related to JWT.
 * @author Jagdish Reddy
 */
@Injectable()
export class JWTService {

    constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private configService: ConfigService,
    ) {}

    /**
   * Generate a JWT token for the given email.
   *
   * @param payload The payload to add in JWT.
   * @return Generated JWT token.
   */
    createToken(payload: Record<string, any>): string {
        const expiresIn = this.configService.get('JWT_EXPIRE_IN'),
            secretOrKey = this.configService.get('JWT_SECRET_KEY');

        return jwt.sign(payload, secretOrKey, {
            expiresIn: expiresIn,
        });
    }

    /**
   *
   *
   * @param {*} signedAccount
   * @return {Promise<Account>}
   */
    async validateAccount(signedAccount: any): Promise<Account> {
        const accountInstance = await this.accountModel
            .findOne({
                email: signedAccount.email,
            })
            .exec();

        if (!accountInstance) {
            throw new BadCredentialsException('Invalid token received', 400);
        }

        return accountInstance;
    }

    /**
   *
   *
   * @param {*} token
   * @return {Promise<Account>}
   */
    fetchLoad(token: any): Promise<Account> {
        const key = this.configService.get('JWT_SECRET_KEY');
        const payload = jwt.verify(token, key);
        return this.validateAccount(payload);
    }

}
