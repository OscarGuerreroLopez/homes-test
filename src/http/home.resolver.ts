import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { GQLHome, GQLHomeInput } from "./entities/home.entity";
import { HomeService } from "../home/services/home.service";
import { GraphQLString } from "graphql";

@Resolver(() => GQLHome)
export class HomeResolver {
  constructor(private readonly homeService: HomeService) {}

  @Mutation(() => GQLHome)
  async createHome(
    @Args("input", { type: () => GQLHomeInput })
    homeInput: GQLHomeInput,
  ): Promise<GQLHome> {
    return this.homeService.createHome(homeInput);
  }

  @Query(() => GQLHome)
  async getHome(
    @Args("uuid", { type: () => GraphQLString })
    uuid: string,
  ): Promise<GQLHome> {
    return this.homeService.findHome(uuid);
  }
}
