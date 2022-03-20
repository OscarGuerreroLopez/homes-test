import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, In, Repository } from "typeorm";
import { BusinessData, User, Home } from "../entities";

@Injectable()
export class HomeRepositoryService {
  constructor(
    @InjectRepository(BusinessData)
    private businessRepository: Repository<BusinessData>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Home) private homeRepository: Repository<Home>,
  ) {}

  async findAllHomes(): Promise<Home[]> {
    return this.homeRepository.find();
  }

  async createHome(homeInput: DeepPartial<Home>): Promise<Home> {
    console.log("@@@createHome at RepositoryService", homeInput);

    const newHome = this.homeRepository.create(homeInput);

    const result = this.homeRepository.save(newHome);
    return result;
  }

  async findHome(uuid: string[]): Promise<Home[]> {
    const results = this.homeRepository.find({
      where: { uuid: In(uuid) },
    });

    return results;
  }

  async deleteHome(uuid: string): Promise<number> {
    const result = await this.homeRepository.delete({ uuid: uuid });
    if (!result.affected) {
      throw Error(`Could not delete home with uuid ${uuid}`);
    }
    return result.affected;
  }

  async updateHome(uuid: string, update: DeepPartial<Home>): Promise<Home> {
    const result = this.homeRepository.save({ uuid: uuid, ...update });

    return result;
  }
}
