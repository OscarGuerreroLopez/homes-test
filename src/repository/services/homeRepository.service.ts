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

  findAllHomes(): Promise<Home[]> {
    const result = this.homeRepository.find();

    return result;
  }

  createHome(homeInput: DeepPartial<Home>): Promise<Home> {
    console.log("@@@createHome at RepositoryService", homeInput);

    const newHome = this.homeRepository.create(homeInput);
    return this.homeRepository.save(newHome);
  }

  findHome(uuid: string[]): Promise<Home[]> {
    const results = this.homeRepository.find({
      where: { uuid: In(uuid) },
    });

    return results;
  }
}
