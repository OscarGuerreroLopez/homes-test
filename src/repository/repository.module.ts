import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessData, User, Home } from "./entities";
import { HomeRepositoryService } from "./services";
@Module({
  imports: [TypeOrmModule.forFeature([BusinessData, User, Home])],
  providers: [HomeRepositoryService],
  exports: [HomeRepositoryService],
})
export class RepositoryModule {}
