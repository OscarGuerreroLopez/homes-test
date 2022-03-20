import { Module } from "@nestjs/common";
import { HomeEntityInstance } from "./entities/home.entity";
import { HomeService } from "./services/home.service";
import { MakeUUID } from "../shared";
import { RepositoryModule } from "../repository/repository.module";

@Module({
  imports: [RepositoryModule],
  providers: [HomeEntityInstance, HomeService, MakeUUID],
})
export class HomeModule {}
