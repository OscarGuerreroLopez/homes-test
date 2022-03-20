import { Injectable } from "@nestjs/common";

@Injectable()
export class ComputeNegotiationMarginService {
  getMargin(
    finalOfferPrice: number,
    targetSalePrice: number,
    maxNegociationMargin = 7,
  ) {
    const price = targetSalePrice / finalOfferPrice - 1;
    const negotiationMargin = Math.min(price, maxNegociationMargin);

    return negotiationMargin;
  }
}
