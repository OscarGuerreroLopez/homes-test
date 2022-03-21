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

  validateEmail(email: string) {
    // we want top make sure that the email is not too long before doing the regex,
    // althougg there are better ways to check an email, this is for the test only
    if (email.length > 100) {
      throw new BadRequestException(`Invalid email, too long ${email}`);
    }

    const isValid = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    if (!isValid) {
      throw new BadRequestException(`Invalid email ${email}`);
    }

    return email;
  }
}
