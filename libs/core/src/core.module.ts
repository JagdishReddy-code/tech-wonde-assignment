import { DynamicModule, Module } from '@nestjs/common';
import { CoreService } from './core.service';

@Module({})
export class CoreModule {

    static forRoot(): DynamicModule {
        return {
            global: true,
            module: CoreModule,
            imports: [],
            providers: [CoreService],
            exports: [CoreService],
        };
    }

}
