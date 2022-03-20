import { Injectable } from "@nestjs/common";
import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";

@Injectable()
export class MakeUUID {
  setRandomUuid(): string {
    return uuidv4();
  }

  isValidUUID(uuid: string) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }
}
