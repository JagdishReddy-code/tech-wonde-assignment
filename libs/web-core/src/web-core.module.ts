import { Module } from '@nestjs/common';
import { WebCoreService } from './web-core.service';

@Module({
    providers: [WebCoreService],
    exports: [WebCoreService],
})
export class WebCoreModule {}
