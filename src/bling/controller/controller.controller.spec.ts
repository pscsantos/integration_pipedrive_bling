import { Test, TestingModule } from '@nestjs/testing';
import { BlingController } from './blinq.controller';

describe('BlingController', () => {
  let controller: BlingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlingController],
    }).compile();

    controller = module.get<BlingController>(BlingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
