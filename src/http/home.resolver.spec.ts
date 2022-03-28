import { HomeResolver } from "./home.resolver";
// import { HomeService } from "../home/services/home.service";
import { Test } from "@nestjs/testing";
// import { UserModule } from "../user/user.module";
// import { BusinessModule } from "../business/business.module";
// import { HomeModule } from "../home/home.module";
// import { BusinessDataResolver } from "./businessData.resolver";
// import { UserResolver } from "./user.resolver";
import {} from "module";
import { HomeService } from "../home/services/home.service";
const createHomeResult = {
  uuid: "08f719fe-a1d0-47cc-acc3-d48eaa9a2e11",
  zipcode: "12345",
  surfaceM2: 20,
};
describe("Home resolver", () => {
  let homeResolver: HomeResolver;
  let homeService: HomeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      // imports: [HomeModule, UserModule, BusinessModule],
      providers: [
        HomeResolver,
        {
          provide: HomeService,
          useValue: {
            createHome: () => createHomeResult,
          },
        },
      ],
    }).compile();

    homeResolver = module.get<HomeResolver>(HomeResolver);
    homeService = module.get<HomeService>(HomeService);
  });

  it("Should call createHome", async () => {
    const spyCreateHome = jest.spyOn(homeService, "createHome");
    const input = {
      zipcode: "12345",
      surfaceM2: 100.23,
    };
    const result = await homeResolver.createHome(input);
    expect(spyCreateHome).toHaveBeenCalled();
    expect(spyCreateHome).toHaveBeenCalledWith(input);
    expect(result).toStrictEqual(createHomeResult);
    expect(homeResolver).toBeDefined();
  });
});
