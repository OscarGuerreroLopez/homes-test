import { Test, TestingModule } from "@nestjs/testing";
import { HttpResolver } from "./http.resolver";
import { HttpService } from "./http.service";

describe("HttpResolver", () => {
  let resolver: HttpResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpResolver, HttpService],
    }).compile();

    resolver = module.get<HttpResolver>(HttpResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
