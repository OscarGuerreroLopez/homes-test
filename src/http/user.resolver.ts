import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GQLUser, GQLUserInput } from "./entities/user.entity";
import { UserService } from "../user/services/user.service";
import { GraphQLString } from "graphql";

@Resolver(() => GQLUser)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => GQLUser)
  async createUser(
    @Args("input", { type: () => GQLUserInput })
    userInput: GQLUserInput,
  ): Promise<GQLUser> {
    return this.userService.createUser(userInput);
  }

  @Query(() => GQLUser)
  async getUser(
    @Args("uuid", { type: () => GraphQLString })
    uuid: string,
  ): Promise<GQLUser> {
    return this.userService.findUser(uuid);
  }
}
