import { BadRequestException, Inject, Injectable } from "@nestjs/common";
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

  validID(uuid: string) {
    const isValid = this.makeUUID.isValidUUID(uuid);

    if (!isValid) {
      throw new BadRequestException(`Invalid UUID ${uuid}`);
    }

    return uuid;
  }
}
