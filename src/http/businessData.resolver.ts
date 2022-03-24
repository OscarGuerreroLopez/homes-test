import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { GQLBusinessData } from "./entities/businessData.entity";
import { BusinessDataService } from "../business/services";
import { CreateBusinessDataInput } from "./dto/create-business-data.dto";

@Resolver(() => GQLBusinessData)
export class BusinessDataResolver {
  constructor(private readonly businessDataService: BusinessDataService) {}

  @Mutation(() => GQLBusinessData)
  async generateBusinessDataForHome(
    @Args("createBusinessDataInput")
    businessDataInput: CreateBusinessDataInput,
  ): Promise<GQLBusinessData> {
    return this.businessDataService.generateBusinessDataForHome(
      businessDataInput,
    );
  }

  @Query(() => GQLBusinessData)
  async getBusinessDataFromHomeUuid(
    @Args("homeUuid", { type: () => GraphQLString })
    homeUuid: string,
  ): Promise<GQLBusinessData> {
    return this.businessDataService.findBusinessDataByHomeUuid(homeUuid);
  }
}
