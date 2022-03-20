import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLFloat, GraphQLString } from "graphql";
import { GQLBusinessData } from "./entities/businessData.entity";
import { BusinessDataService } from "../business/services";

@Resolver(() => GQLBusinessData)
export class BusinessDataResolver {
  constructor(private readonly businessDataService: BusinessDataService) {}

  @Mutation(() => GQLBusinessData)
  async generateBusinessDataForHome(
    @Args("homeUuid", { type: () => GraphQLString })
    homeUuid: string,
    @Args("initialOfferPrice", { type: () => GraphQLFloat })
    initialOfferPrice: number,
    @Args("finalOfferPrice", { type: () => GraphQLFloat })
    finalOfferPrice: number,
    @Args("targetSalePrice", { type: () => GraphQLFloat })
    targetSalePrice: number,
  ): Promise<GQLBusinessData> {
    return this.businessDataService.generateBusinessDataForHome(
      homeUuid,
      initialOfferPrice,
      finalOfferPrice,
      targetSalePrice,
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
