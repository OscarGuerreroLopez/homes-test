import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { MakeUUID } from "../../shared";

export interface User {
  uuid: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class UserEntity {
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
