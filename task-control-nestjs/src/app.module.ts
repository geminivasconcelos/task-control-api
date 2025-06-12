import { TaskModule } from './task/task.module';
import { TaskController } from './task/task.controller';
import {
  TasksCategoryModule,
} from './tasks-category/tasks-category.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { TasksCategory } from './tasks-category/tasks-category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, TasksCategory],
      synchronize: true,
    }),
    UsersModule,
    AuthenticationModule,
    TaskModule,
    TasksCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
