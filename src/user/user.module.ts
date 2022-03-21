import { Module } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./services/user.service";
import { RepositoryModule } from "../repository/repository.module";
import { MakeUUID } from "../shared";

@Module({
  imports: [RepositoryModule],
  providers: [UserEntity, UserService, MakeUUID],
  exports: [UserService],
})
export class UserModule {}
