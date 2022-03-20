import { MakeUUID } from "./makeUUID";
import { validate } from "uuid";

describe("UUID test", () => {
  const makeUUID = new MakeUUID();
  it("Should return a valid ID", () => {
    const uuid = makeUUID.setRandomUuid();

    expect(validate(uuid)).toBeTruthy();
  });
});
