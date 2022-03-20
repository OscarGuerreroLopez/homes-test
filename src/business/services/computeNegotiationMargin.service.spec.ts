import { ComputeNegotiationMarginService } from "./computeNegotiationMargin.service";

describe("computeNegotiationMargin.service test", () => {
  it("Should return the right compute the negociation margin", () => {
    const computeNegotiationMargin = new ComputeNegotiationMarginService();

    const result = computeNegotiationMargin.getMargin(1000, 35, 4);

    console.log("@@@111", result);

    expect(result).toStrictEqual(-0.965);
  });
});
