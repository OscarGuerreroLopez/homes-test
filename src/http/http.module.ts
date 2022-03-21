import { Module } from "@nestjs/common";
import { BusinessModule } from "../business/business.module";
import { HomeModule } from "../home/home.module";
import { HomeResolver } from "./home.resolver";
import { BusinessDataResolver } from "./businessData.resolver";
import { UserModule } from "../user/user.module";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [BusinessModule, HomeModule, UserModule],
  providers: [HomeResolver, BusinessDataResolver, UserResolver],
})
export class HttpModule {}
