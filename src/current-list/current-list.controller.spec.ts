import { Test, TestingModule } from '@nestjs/testing';
import { CurrentlistController } from './current-list.controller';

describe('CurrentlistController', () => {
  let controller: CurrentlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentlistController],
    }).compile();

    controller = module.get<CurrentlistController>(CurrentlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
