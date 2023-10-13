import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entities';
import { User } from 'src/auth/entities/user.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, User])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
