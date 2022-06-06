import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

/**
 * @description JWT strategy, defined all method like validate.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly jwtService: JWTService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    // noinspection JSUnusedGlobalSymbols
    /**
   * This method is invoked by "passport-jwt" module.
   *
   * @param payload
   * @param req
   * @param done
   */
    public async validate(payload: any, req: any, done: any): Promise<any> {
        const user = await this.jwtService.validateAccount(req);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }

        done(null, user);
    }

}
