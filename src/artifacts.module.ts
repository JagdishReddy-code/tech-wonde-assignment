import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JWTService } from './services/jwt/jwt.service';
import { JwtStrategy } from './services/jwt/jwt.strategy';
import { CompanyController } from './controllers/company/company.controller';
import { CompanyService } from './services/company/company.service';
import { TeamController } from './controllers/team/team.controller';
import { TeamService } from './services/team/team.service';
//TODO: This module is moved to end just for temporary module loading and injection working
import { SchemaModule } from '@lib/core/schemas/schema.module';

@Module({
    imports: [SchemaModule],
    controllers: [AuthController, CompanyController, TeamController],
    providers: [AuthService, JWTService, JwtStrategy, CompanyService, TeamService],
})
export class ArtifactsModule {}
