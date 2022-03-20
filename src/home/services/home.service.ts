import { Inject, Injectable } from '@nestjs/common';
import { HomeEntity, HomeEntityInstance } from '../entities/home.entity';

@Injectable()
export class HomeService {
  constructor(
    @Inject(HomeEntityInstance) private homeEntityInstance: HomeEntityInstance,
  ) {}

  async createHome(homeInput: Partial<HomeEntity>): Promise<HomeEntity> {
    const newHome: HomeEntity = {
      id: this.homeEntityInstance.getID(),
      zipcode: this.homeEntityInstance.getZipCode(homeInput.zipcode),
      ...homeInput,
    };

    return newHome;
  }
}
