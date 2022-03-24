import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNumber } from "class-validator";

@InputType("CreateHomeInput")
export class CreateHomeInput {
  @IsString()
  @Field()
  zipcode: string;

  @IsNumber()
  @Field({ nullable: true })
  surfaceM2?: number;
}
