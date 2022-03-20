import { CreateHttpInput } from "./create-http.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateHttpInput extends PartialType(CreateHttpInput) {
  @Field(() => Int)
  id: number;
}
