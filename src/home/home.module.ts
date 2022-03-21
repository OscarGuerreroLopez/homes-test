import { Module } from "@nestjs/common";
import { HomeEntity } from "./entities/home.entity";
import { HomeService } from "./services/home.service";
import { MakeUUID } from "../shared";
import { RepositoryModule } from "../repository/repository.module";

@Module({
  imports: [RepositoryModule],
  providers: [HomeEntity, HomeService, MakeUUID],
  exports: [HomeService],
})
export class HomeModule {}
