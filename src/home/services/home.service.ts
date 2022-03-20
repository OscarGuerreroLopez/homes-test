import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { HomeEntity, HomeEntityInstance } from "../entities/home.entity";
import { HomeRepositoryService } from "../../repository/services";

// We abstract the repositry service so the business logic is not attached to any
// specific database, but instead it is tied to methods like getAllHomes, createHome, etc...

@Injectable()
export class HomeService {
  constructor(
    @Inject(HomeEntityInstance) private homeEntityInstance: HomeEntityInstance,
    @Inject(HomeRepositoryService)
    private repositoryService: HomeRepositoryService,
  ) {}

  async getAllHomes(): Promise<HomeEntity[]> {
    return this.repositoryService.findAllHomes();
  }

  async findHome(uuid: string): Promise<HomeEntity> {
    const results = await this.repositoryService.findHome([uuid]);
    if (results.length !== 1) {
      throw new NotFoundException(
        `Could not find home or too many homes with uuid ${uuid}`,
      );
    }
    return results[0];
  }

  async createHome(homeInput: Partial<HomeEntity>): Promise<HomeEntity> {
    const newHome: HomeEntity = {
      uuid: this.homeEntityInstance.getID(),
      zipcode: this.homeEntityInstance.getZipCode(homeInput.zipcode),
      ...homeInput,
    };

    const result = this.repositoryService.createHome(newHome);

    console.log("@@@HomeService createHome", result);

    return result;
  }
}
