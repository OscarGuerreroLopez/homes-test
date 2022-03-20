import { Module } from "@nestjs/common";
import { BusinessModule } from "../business/business.module";
import { HomeModule } from "../home/home.module";
import { HomeResolver } from "./home.resolver";
import { BusinessDataResolver } from "./businessData.resolver";

@Module({
  imports: [BusinessModule, HomeModule],
  providers: [HomeResolver, BusinessDataResolver],
})
export class HttpModule {}
