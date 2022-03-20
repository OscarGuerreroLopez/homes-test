import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessData, User, Home } from "./entities";
import { HomeRepositoryService, BusinessRepositoryService } from "./services";

@Module({
  imports: [TypeOrmModule.forFeature([BusinessData, User, Home])],
  providers: [HomeRepositoryService, BusinessRepositoryService],
  exports: [HomeRepositoryService, BusinessRepositoryService],
})
export class RepositoryModule {}
