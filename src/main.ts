import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const configService = app.get(ConfigService);

    app.enableCors({
        origin: [configService.get('CLIENT_FRONTEND_URL')],
        methods: 'GET,PUT,PATCH,POST,DELETE',
    });
    await app.listen(configService.get('APP_PORT'));
}
bootstrap();
