import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtifactsModule } from './artifacts.module';
import { CoreModule } from '@lib/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                ...fs.readdirSync('configs/').map((item) => `configs/${item}`),
            ],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('DB_URI'),
            }),
        }),
        CoreModule.forRoot(),
        ArtifactsModule,
    ],
})
export class AppModule {}
