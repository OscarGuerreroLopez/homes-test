import { Field, InputType, ObjectType } from "@nestjs/graphql";
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

@InputType("HomeInput")
export class GQLHomeInput {
  @Field(() => GraphQLString)
  zipcode!: string;

  @Field(() => GraphQLFloat, { nullable: true })
  surfaceM2?: number;
}
