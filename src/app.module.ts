import { Module } from "@nestjs/common";
import { HomeModule } from "./home/home.module";
import { BusinessModule } from "./business/business.module";
import { RepositoryModule } from "./repository/repository.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../ormconfig";

@Module({
  imports: [
    HomeModule,
    BusinessModule,
    RepositoryModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
