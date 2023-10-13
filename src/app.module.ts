import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entities';
import { AnimalsModule } from './animals/animals.module';
import { Animal } from './animals/entities/animal.entities';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'veterinaria',
      synchronize: true,
      logging: false,
      entities: [User, Animal],
    }),
    AuthModule,
    AnimalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
