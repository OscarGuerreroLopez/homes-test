import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import {
  BusinessData,
  BusinessDataInstance,
} from "../entities/businessData.entity";
import { BusinessRepositoryService } from "../../repository/services";
import { HomeRepositoryService } from "../../repository/services";

@Injectable()
export class BusinessDataService {
  constructor(
    @Inject(BusinessDataInstance)
    private businessDataInstance: BusinessDataInstance,
    @Inject(BusinessRepositoryService)
    private businessDataRepository: BusinessRepositoryService,
    @Inject(HomeRepositoryService)
    private homeRepositoryService: HomeRepositoryService,
  ) {}

  async generateBusinessDataForHome(
    homeUuid: string,
    initialOfferPrice: number,
    finalOfferPrice: number,
    targetSalePrice: number,
  ): Promise<BusinessData> {
    // TODO : write business data logic to compute :
    //  - serviceFees (see README)
    //  - negociation margin (see README)

    const businessData = await this.businessDataRepository.createBusinessData({
      homeUuid,
      initialOfferPrice,
      finalOfferPrice,
      targetSalePrice,
      // serviceFees
      // negociationMargin
    });
    await this.homeRepositoryService.updateHome(homeUuid, {
      businessDataUuid: businessData.uuid,
    });
    return businessData;
  }

  async findBusinessDataByHomeUuid(homeUuid: string): Promise<BusinessData> {
    const results =
      await this.businessDataRepository.findBusinessDataByHomeUuid(homeUuid);
    if (results.length !== 1) {
      throw new NotFoundException(
        `Could not find business data from home with uuid ${homeUuid}`,
      );
    }
    return results[0];
  }

  async findBusinessData(uuid: string): Promise<BusinessData> {
    const results = await this.businessDataRepository.findBusinessData([uuid]);
    if (results.length !== 1) {
      throw Error(`Could not find business data with uuid ${uuid}`);
    }
    return results[0];
  }

  async deleteBusinessData(uuid: string): Promise<boolean> {
    try {
      await this.businessDataRepository.deleteBusinessData(uuid);
      return true;
    } catch (error) {
      // we should log the error and throw a generic error message
      // did not have time to implement a logger
      console.log("@@@ddeleteBusinessData error", error);

      throw new InternalServerErrorException(`Not able to delete ${uuid}`);
    }
  }
}
