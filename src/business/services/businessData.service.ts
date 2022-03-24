import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import {
  BusinessData,
  BusinessDataEntity,
} from "../entities/businessData.entity";
import { BusinessRepositoryService } from "../../repository/services";
import { HomeRepositoryService } from "../../repository/services";
import { ComputeNegotiationMarginService } from "./computeNegotiationMargin.service";
import { ComputeServiceFees } from "./computeServiceFees.service";

interface CreateInput {
  homeUuid: string;
  initialOfferPrice: number;
  finalOfferPrice: number;
  targetSalePrice: number;
}
@Injectable()
export class BusinessDataService {
  //   computeNegotiationMargin: ComputeNegotiationMarginService;
  //   computeServiceFees: ComputeServiceFees;
  constructor(
    @Inject(BusinessDataEntity)
    private businessDataEntity: BusinessDataEntity,
    @Inject(BusinessRepositoryService)
    private businessDataRepository: BusinessRepositoryService,
    @Inject(HomeRepositoryService)
    private homeRepositoryService: HomeRepositoryService,
    @Inject(ComputeNegotiationMarginService)
    private computeNegotiationMargin: ComputeNegotiationMarginService,
    @Inject(ComputeServiceFees) private computeServiceFees: ComputeServiceFees,
  ) {}

  async generateBusinessDataForHome(
    createInput: CreateInput,
  ): Promise<BusinessData> {
    // TODO : write business data logic to compute :
    //  - serviceFees (see README)
    //  - negociation margin (see README)

    const { finalOfferPrice, targetSalePrice, initialOfferPrice } = createInput;

    const homeUuid = this.businessDataEntity.validID(createInput.homeUuid);

    const home = await this.homeRepositoryService.findHome([homeUuid]);

    if (home.length !== 1) {
      throw new NotFoundException(
        `Could not find home or too many homes with uuid ${homeUuid}`,
      );
    }
    const negociationMargin = this.computeNegotiationMargin.getMargin(
      finalOfferPrice,
      targetSalePrice,
    );

    const serviceFees = this.computeServiceFees.getServiceFees(
      finalOfferPrice,
      home[0].zipcode,
    );

    const businessData = await this.businessDataRepository.createBusinessData({
      uuid: this.businessDataEntity.getID(),
      homeUuid,
      initialOfferPrice,
      finalOfferPrice,
      targetSalePrice,
      serviceFees,
      negociationMargin,
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
      console.log("@@@deleteBusinessData error", error);

      throw new InternalServerErrorException(`Not able to delete ${uuid}`);
    }
  }
}
