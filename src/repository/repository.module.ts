import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BusinessData, User, Home } from "./entities";
@Module({
  imports: [TypeOrmModule.forFeature([BusinessData, User, Home])],
})
export class RepositoryModule {}
