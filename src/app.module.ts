import { Module } from "@nestjs/common";
import { HomeModule } from "./home/home.module";
import { BusinessModule } from "./business/business.module";
import { RepositoryModule } from "./repository/repository.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "./http/http.module";
import config from "../ormconfig";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";

@Module({
  imports: [
    HomeModule,
    BusinessModule,
    RepositoryModule,
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
