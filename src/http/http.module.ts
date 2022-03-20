import { Module } from "@nestjs/common";
import { HttpService } from "./http.service";
import { HttpResolver } from "./http.resolver";
import { BusinessModule } from "../business/business.module";
import { HomeModule } from "../home/home.module";
import { HomeResolver } from "./home.resolver";
import { BusinessDataResolver } from "./businessData.resolver";

@Module({
  imports: [BusinessModule, HomeModule],
  providers: [HttpResolver, HomeResolver, BusinessDataResolver, HttpService],
})
export class HttpModule {}
