import { Inject, Injectable } from "@nestjs/common";
import { MakeUUID } from "../../shared";

export interface BusinessData {
  uuid: string;
  initialOfferPrice?: number;
  finalOfferPrice?: number;
  targetSalePrice?: number;
  serviceFees?: number;
  negociationMargin?: number;
  homeUuid?: string;
  home?: any;
}

@Injectable()
export class BusinessDataInstance {
  constructor(@Inject(MakeUUID) private makeUUID: MakeUUID) {}

  getID() {
    return this.makeUUID.setRandomUuid();
  }
}
