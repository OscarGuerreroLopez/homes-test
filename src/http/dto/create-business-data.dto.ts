import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNumber } from "class-validator";

@InputType("CreateBusinessDataInput")
export class CreateBusinessDataInput {
  @IsString()
  @Field()
  homeUuid: string;

  @IsNumber()
  @Field()
  initialOfferPrice: number;

  @IsNumber()
  @Field()
  finalOfferPrice: number;

  @IsNumber()
  @Field()
  targetSalePrice: number;
}
