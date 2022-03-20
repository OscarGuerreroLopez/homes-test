import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MakeUUID } from '../../shared';

export interface HomeEntity {
  id: string;
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
  businessDataUuid?: string;
  businessData?: any;
}

// This might look unnecesary, but I understand that in a microservice env here
// we need to apply business rules to our entity, even if typeorm also checks before inserting
// this way, if we have a service that handles DB transactions we will not call it unnecesarily
// thus offloading that service

@Injectable()
export class HomeEntityInstance {
  constructor(@Inject(MakeUUID) private makeUUID: MakeUUID) {}

  getID() {
    return this.makeUUID.setRandomUuid();
  }

  getZipCode(zipCode: string) {
    if (!zipCode) {
      throw new BadRequestException(`No ZipCode ${zipCode}`);
    }

    const isnum = /^\d+$/.test(zipCode);

    if (!isnum || zipCode.length !== 5) {
      throw new BadRequestException(`Invalid ZipCode ${zipCode}`);
    }

    return zipCode;
  }
}