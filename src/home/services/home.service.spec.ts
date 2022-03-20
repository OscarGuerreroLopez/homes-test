import { Test, TestingModule } from "@nestjs/testing";
import { MakeUUID } from "../../shared";
import { HomeEntityInstance } from "../entities/home.entity";
import { HomeService } from "./home.service";
import { HomeRepositoryService } from "../../repository/services";
import { BadRequestException } from "@nestjs/common";

const uuid = "08f719fe-a1d0-47cc-acc3-d48eaa9a2e11";

describe("OwnersService", () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        HomeEntityInstance,
        { provide: MakeUUID, useValue: { setRandomUuid: () => uuid } },
        {
          provide: HomeRepositoryService,
          useValue: {
            createHome: () => ({
              uuid: "08f719fe-a1d0-47cc-acc3-d48eaa9a2e11",
              zipcode: "12345",
              surfaceM2: 20,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("createHome shoult return a valid result with uuid and valid zipcode", async () => {
    const result = await service.createHome({
      zipcode: "12345",
      surfaceM2: 20,
    });

    expect(result).toStrictEqual({
      uuid: "08f719fe-a1d0-47cc-acc3-d48eaa9a2e11",
      zipcode: "12345",
      surfaceM2: 20,
    });
  });

  it("createHome shoult fail cause invalid zipcode", async () => {
    try {
      await service.createHome({
        zipcode: "123",
        surfaceM2: 20,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toStrictEqual("Invalid ZipCode 123");
    }
  });
});
