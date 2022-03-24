import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLFloat, GraphQLString } from "graphql";
@ObjectType("Home")
export class GQLHome {
  @Field(() => GraphQLString)
  uuid: string;

  @Field(() => GraphQLString)
  zipcode!: string;

  @Field(() => GraphQLFloat, { nullable: true })
  surfaceM2?: number;
}
