import { Module } from '@nestjs/common';
import { HomeEntityInstance } from './entities/home.entity';
import { HomeService } from './services/home.service';
import { MakeUUID } from '../shared';

@Module({
  providers: [HomeEntityInstance, HomeService, MakeUUID],
})
export class HomeModule {}
