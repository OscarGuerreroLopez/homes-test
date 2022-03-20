import { Module } from "@nestjs/common";
import { RepositoryModule } from "../repository/repository.module";
import { BusinessDataInstance } from "./entities/businessData.entity";
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
    BusinessDataInstance,
    BusinessDataService,
    MakeUUID,
    ComputeServiceFees,
  ],
  exports: [BusinessDataService],
})
export class BusinessModule {}
