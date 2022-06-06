import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../DTOs/auth/login.dto';
import { BaseController } from '../base.controller';

/**
 * @description Auth Contoller.
 * @author Jagdish Reddy
 */
@Controller('auth')
export class AuthController extends BaseController {

    constructor(private readonly authService: AuthService) {
        super();
    }

  /**
   * @description Route for login nd get a JWT Access token.
   * @param {LoginDto} login Accepts Login Data Payload.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
    async login(@Body() login: LoginDto): Promise<any> {
        const response = await this.authService.validateLogin(login);
        return this.respond(response);
    }

}
