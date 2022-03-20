import { ComputeServiceFees } from "./computeServiceFees.service";

describe("computeNegotiationMargin.service test", () => {
  it("Should return the fees for 200000 in paris", () => {
    const computeServiceFees = new ComputeServiceFees();

    const result = computeServiceFees.getServiceFees(200000, "75016");

    expect(result).toStrictEqual(22000);
  });

  it("Should return the fees for 320000 in nantes", () => {
    const computeServiceFees = new ComputeServiceFees();

    const result = computeServiceFees.getServiceFees(320000, "44016");

    expect(result).toStrictEqual(35200);
  });

  it("Should return the fees for 120000 in Lyon", () => {
    const computeServiceFees = new ComputeServiceFees();

    const result = computeServiceFees.getServiceFees(120000, "69016");

    expect(result).toStrictEqual(22000);
  });

  it("Should return the fees for 440000 in somewhere", () => {
    const computeServiceFees = new ComputeServiceFees();

    const result = computeServiceFees.getServiceFees(440000, "84016");

    expect(result).toStrictEqual(35200);
  });
});
