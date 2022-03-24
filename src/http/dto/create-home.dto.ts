import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNumber } from "class-validator";

@InputType("HomeInput")
export class CreateHomeInput {
  @IsString()
  @Field()
  zipcode: string;

  @IsNumber()
  @Field({ nullable: true })
  surfaceM2?: number;
}
