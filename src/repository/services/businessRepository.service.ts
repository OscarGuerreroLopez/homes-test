import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, In, Repository } from "typeorm";
import { BusinessData } from "../entities";

@Injectable()
export class BusinessRepositoryService {
  constructor(
    @InjectRepository(BusinessData)
    private businessDataRepository: Repository<BusinessData>,
  ) {}

  async createBusinessData(
    inputBusinessData: DeepPartial<BusinessData>,
  ): Promise<BusinessData> {
    const businessData = this.businessDataRepository.create(inputBusinessData);
    return this.businessDataRepository.save(businessData);
  }

  async findBusinessDataByHomeUuid(homeUuid: string): Promise<BusinessData[]> {
    const results = await this.businessDataRepository.find({
      where: { homeUuid },
    });

    return results;
  }

  async findBusinessData(uuid: string[]): Promise<BusinessData[]> {
    const results = await this.businessDataRepository.find({
      where: { uuid: In(uuid) },
    });

    return results;
  }

  async deleteBusinessData(uuid: string): Promise<number> {
    const result = await this.businessDataRepository.delete({ uuid: uuid });
    if (!result.affected) {
      throw Error(`Could not delete business data with uuid ${uuid}`);
    }
    return result.affected;
  }
}
