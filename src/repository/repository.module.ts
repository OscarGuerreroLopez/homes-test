import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessData, User, Home } from "./entities";
import {
  HomeRepositoryService,
  BusinessRepositoryService,
  UserRepositoryService,
} from "./services";

@Module({
  imports: [TypeOrmModule.forFeature([BusinessData, User, Home])],
  providers: [
    HomeRepositoryService,
    BusinessRepositoryService,
    UserRepositoryService,
  ],
  exports: [
    HomeRepositoryService,
    BusinessRepositoryService,
    UserRepositoryService,
  ],
})
export class RepositoryModule {}
