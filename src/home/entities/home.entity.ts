import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { MakeUUID } from "../../shared";

export interface Home {
  uuid: string;
  zipcode: string;
  streetNumber?: string;
  streetName?: string;
  city?: string;
  surfaceM2?: number;
  houseLandSurfaceM2?: number;
  houseBuildableSurfaceM2?: number;
  numRooms?: number;
  numBedrooms?: number;
  numBathrooms?: number;
  numFloors?: number;
  constructionYear?: number;
  numSecuredParkingSpots?: number;
  numUnsecuredParkingSpots?: number;
}

// This might look unnecesary, but I understand that in a microservice env here
// we need to apply business rules to our entity, (this is a business entity, not a DB entity)
// even if typeorm also checks before inserting, but the DB Repository might be implemented in another service
// This way, if we have a service that handles DB transactions we will not call it unnecesarily
// if the data does not meet the business entity rules , thus offloading that service

@Injectable()
export class HomeEntity {
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

  getZipCode(zipCode: string) {
    // simulates a zip code validation
    // we could check if the zipcode belongs to the area
    // that the business operates
    if (!zipCode) {
      throw new BadRequestException(`No ZipCode ${zipCode}`);
    }

    const isnum = /^\d+$/.test(zipCode);

    if (!isnum || zipCode.length !== 5) {
      throw new BadRequestException(`Invalid ZipCode ${zipCode}`);
    }

    return zipCode;
  }

  validStreetNumber(num: string) {
    if (!num) {
      return num;
    }
    // we could make sure the street number exist for real
    const isnum = /^\d+$/.test(num);
    if (!isnum) {
      throw new BadRequestException(`Invalid Street number ${num}`);
    }

    return num;
  }

  validStreetName(name: string) {
    // we could make sure the street name exist for real
    return name;
  }

  validCity(city: string) {
    // we could make sure the city is valid
    return city;
  }
}
