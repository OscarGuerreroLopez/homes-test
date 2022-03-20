import { Test, TestingModule } from '@nestjs/testing';
import { MakeUUID } from '../../shared';
import { HomeEntityInstance } from '../entities/home.entity';
import { HomeService } from './home.service';

const uuid = '08f719fe-a1d0-47cc-acc3-d48eaa9a2e11';

describe('OwnersService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        HomeEntityInstance,
        { provide: MakeUUID, useValue: { setRandomUuid: () => uuid } },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createHome shoult return a valid result with uuid and valid zipcode', async () => {
    const result = await service.createHome({ zipcode: '12345' });

    expect(result).toStrictEqual({
      id: '08f719fe-a1d0-47cc-acc3-d48eaa9a2e11',
      zipcode: '12345',
    });
  });
});
