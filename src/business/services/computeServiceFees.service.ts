import { Injectable } from "@nestjs/common";

const parisCodes = ["75", "92", "93", "84"];
const nantesAndLyonCodes = ["44", "69"];

@Injectable()
export class ComputeServiceFees {
  getServiceFees(finalOfferPrice: number, zipCode: string) {
    const city = zipCode.substring(0, 2);

    if (parisCodes.includes(city)) {
      return parisFees(finalOfferPrice);
    }

    if (nantesAndLyonCodes.includes(city)) {
      return nantesAndLyonFees(finalOfferPrice);
    }

    return defaultFees(finalOfferPrice);
  }
}

const parisFees = (price: number): number => {
  if (price < 100000) {
    return 20000;
  }

  if (price >= 100000 && price < 145000) {
    return 22000;
  }

  if (price >= 145000 && price < 200000) {
    return 23000;
  }

  if (price >= 200000 && price < 400000) {
    return price * 0.11;
  }

  if (price >= 400000 && price < 600000) {
    return price * 0.08;
  }

  if (price >= 600000) {
    return price * 0.1;
  }
};

const nantesAndLyonFees = (price: number): number => {
  if (price < 100000) {
    return 20000;
  }

  if (price >= 100000 && price < 145000) {
    return 22000;
  }

  if (price >= 145000 && price < 200000) {
    return 23000;
  }

  if (price >= 200000 && price < 400000) {
    return price * 0.11;
  }

  if (price >= 400000 && price < 600000) {
    return price * 0.08;
  }

  if (price >= 600000) {
    return price * 0.9999; // is it right?
  }
};

const defaultFees = (price: number): number => {
  if (price < 100000) {
    return 15000;
  }

  if (price >= 100000 && price < 145000) {
    return 19000;
  }

  if (price >= 145000 && price < 200000) {
    return 20000;
  }

  if (price >= 200000 && price < 400000) {
    return price * 0.1;
  }

  if (price >= 400000 && price < 600000) {
    return price * 0.08;
  }

  if (price >= 600000) {
    return price * 0.3; // is it right?
  }
};
