import { Module } from "@nestjs/common";
import { RepositoryModule } from "../repository/repository.module";
import { BusinessDataEntity } from "./entities/businessData.entity";
import { MakeUUID } from "../shared";
import {
  ComputeNegotiationMarginService,
  BusinessDataService,
  ComputeServiceFees,
} from "./services";

@Module({
  imports: [RepositoryModule],
  providers: [
    ComputeNegotiationMarginService,
    BusinessDataEntity,
    BusinessDataService,
    MakeUUID,
    ComputeServiceFees,
  ],
  exports: [BusinessDataService],
})
export class BusinessModule {}
