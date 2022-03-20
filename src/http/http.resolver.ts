import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { HttpService } from "./http.service";
import { Http } from "./entities/http.entity";
import { CreateHttpInput } from "./dto/create-http.input";
import { UpdateHttpInput } from "./dto/update-http.input";

@Resolver(() => Http)
export class HttpResolver {
  constructor(private readonly httpService: HttpService) {}

  @Mutation(() => Http)
  createHttp(@Args("createHttpInput") createHttpInput: CreateHttpInput) {
    return this.httpService.create(createHttpInput);
  }

  @Query(() => [Http], { name: "http" })
  findAll() {
    return this.httpService.findAll();
  }

  @Query(() => Http, { name: "http" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.httpService.findOne(id);
  }

  @Mutation(() => Http)
  updateHttp(@Args("updateHttpInput") updateHttpInput: UpdateHttpInput) {
    return this.httpService.update(updateHttpInput.id, updateHttpInput);
  }

  @Mutation(() => Http)
  removeHttp(@Args("id", { type: () => Int }) id: number) {
    return this.httpService.remove(id);
  }
}
