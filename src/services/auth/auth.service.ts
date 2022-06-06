import { HttpStatus, Injectable } from '@nestjs/common';
import { JWTService } from '../jwt/jwt.service';
import { BaseService } from '../base.service';
import { LoginDto } from '../../DTOs/auth/login.dto';
import { RequestUtils } from '@lib/web-core/utils/request/request-utils';
import { BasicDataDto } from '../../DTOs/auth/basic-data.dto';
import { Account } from '@lib/core/schemas/account/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvalidDataException } from '@lib/core/exceptions/invalid-data-exception';

/**
 * @description Auth Service, defined all authentication related methods.
 * @author Jagdish Reddy
 */
@Injectable()
export class AuthService extends BaseService {

    private static readonly AUTH_FAILURE_MESSAGE = 'No account found with given email & password.';

    constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private readonly jwtService: JWTService,
    ) {
        super();
    }

    /**
   * Authenticate the user with given email & password and provide an access token if valid.
   *
   * @param loginData the Login data.
   */
    async validateLogin(loginData: LoginDto): Promise<BasicDataDto> {
        this.logger.debug('User attempt to login ', RequestUtils.mask(loginData));
        const accountInstance = await this.accountModel.findOne({ email: loginData.email }).exec();
        if (!accountInstance) {
            throw new InvalidDataException(AuthService.AUTH_FAILURE_MESSAGE, HttpStatus.NOT_FOUND);
        }

        const accessToken: string = this.getAccessToken(accountInstance);
        this.logger.debug('Login approved and token generated', accessToken);

        return new BasicDataDto(accessToken);
    }

    /**
     * @description Generate Access Token.
     * @param {Account} account Pass the Account. 
     * @return {string}
     */
    private getAccessToken(account: Account): string {
        return this.jwtService.createToken({ email: account.email });
    }

}
