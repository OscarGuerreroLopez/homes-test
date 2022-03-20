import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Http {
  @Field(() => Int, { description: "Example field (placeholder)" })
  exampleField: number;
}
