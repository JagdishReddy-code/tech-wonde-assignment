import { Test, TestingModule } from '@nestjs/testing';
import { WebCoreService } from './web-core.service';

describe('WebCoreService', () => {
    let service: WebCoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebCoreService],
        }).compile();

        service = module.get<WebCoreService>(WebCoreService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
