import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql";

@ObjectType("User")
export class GQLUser {
  @Field(() => GraphQLString)
  uuid: string;

  @Field(() => GraphQLString)
  email!: string;

  @Field(() => GraphQLString, { nullable: true })
  firstName?: string;

  @Field(() => GraphQLString, { nullable: true })
  lastName?: string;
}

@InputType("UserInput")
export class GQLUserInput {
  @Field(() => GraphQLString)
  email!: string;

  @Field(() => GraphQLString, { nullable: true })
  firstName?: string;

  @Field(() => GraphQLString, { nullable: true })
  lastName?: string;
}
