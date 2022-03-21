import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Home, HomeEntity } from "../entities/home.entity";
import { HomeRepositoryService } from "../../repository/services";

// We abstract the repositry service so the business logic is not attached to any
// specific database, but instead it is tied to methods like getAllHomes, createHome, etc...

@Injectable()
export class HomeService {
  constructor(
    @Inject(HomeEntity) private homeEntity: HomeEntity,
    @Inject(HomeRepositoryService)
    private repositoryService: HomeRepositoryService,
  ) {}

  async findAllHomes(): Promise<Home[]> {
    return this.repositoryService.findAllHomes();
  }

  async findHome(uuid: string): Promise<Home> {
    const results = await this.repositoryService.findHome([uuid]);
    if (results.length !== 1) {
      throw new NotFoundException(
        `Could not find home or too many homes with uuid ${uuid}`,
      );
    }
    return results[0];
  }

  async createHome(homeInput: Partial<Home>): Promise<Home> {
    const newHome: Home = {
      uuid: this.homeEntity.getID(),
      zipcode: this.homeEntity.getZipCode(homeInput.zipcode),
      ...homeInput,
    };

    const result = await this.repositoryService.createHome(newHome);

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

  async updateHome(uuid: string, update: Partial<Home>): Promise<Home> {
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
