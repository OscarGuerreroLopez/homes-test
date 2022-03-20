import { Module } from "@nestjs/common";
import { RepositoryModule } from "../repository/repository.module";
import { BusinessDataInstance } from "./entities/businessData.entity";
import { MakeUUID } from "../shared";
import {
  ComputeNegotiationMargin,
  BusinessDataService,
  ComputeServiceFees,
} from "./services";

@Module({
  imports: [RepositoryModule],
  providers: [
    BusinessDataInstance,
    BusinessDataService,
    MakeUUID,
    ComputeNegotiationMargin,
    ComputeServiceFees,
  ],
})
export class BusinessModule {}
