import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { BusinessModule } from './business/business.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [HomeModule, BusinessModule, RepositoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
