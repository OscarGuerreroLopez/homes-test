import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
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

  async findAllHomes(): Promise<HomeEntity[]> {
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

    const result = await this.repositoryService.createHome(newHome);

    console.log("@@@HomeService createHome", result);

    return result;
  }

  async deleteHome(uuid: string): Promise<boolean> {
    try {
      await this.repositoryService.deleteHome(uuid);
      return true;
    } catch (error) {
      // we should log the error and throw a generic error message
      // did not have time to implement a logger
      console.log("@@@deleteHome error", error);

      throw new InternalServerErrorException(`Not able to delete ${uuid}`);
    }
  }

  async updateHome(
    uuid: string,
    update: Partial<HomeEntity>,
  ): Promise<HomeEntity> {
    try {
      const result = await this.repositoryService.updateHome(uuid, update);

      return result;
    } catch (error) {
      // we should log the error and throw a generic error message
      // did not have time to implement a logger
      console.log("@@@updateHome error", error);
      throw new InternalServerErrorException(`Not able to update ${uuid}`);
    }
  }
}
