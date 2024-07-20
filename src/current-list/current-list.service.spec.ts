import { Test, TestingModule } from '@nestjs/testing';
import { CurrentlistService } from './current-list.service';

describe('CurrentlistService', () => {
  let service: CurrentlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentlistService],
    }).compile();

    service = module.get<CurrentlistService>(CurrentlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
