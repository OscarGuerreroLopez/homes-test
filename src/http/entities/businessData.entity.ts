import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLFloat, GraphQLString } from "graphql";

@ObjectType("BusinessData")
export class GQLBusinessData {
  @Field(() => GraphQLString)
  uuid: string;

  @Field(() => GraphQLFloat, { nullable: true })
  initialOfferPrice?: number;

  @Field(() => GraphQLFloat, { nullable: true })
  finalOfferPrice?: number;

  @Field(() => GraphQLFloat, { nullable: true })
  targetSalePrice?: number;

  @Field(() => GraphQLFloat, { nullable: true })
  serviceFees?: number;

  @Field(() => GraphQLFloat, { nullable: true })
  negociationMargin?: number;
}
