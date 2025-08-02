import { UserCoursesModule } from './user-courses/user-courses.module';
import { UserCoursesService } from './user-courses/user-courses.service';
import { UserCoursesController } from './user-courses/user-courses.controller';
import { CoursesModule } from './courses/courses.module';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';

import { TasksCategoryModule } from './tasks-category/tasks-category.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { TasksCategory } from './tasks-category/tasks-category.entity';
import { Tasks } from './task/tasks.entity';
import { TasksModule } from './task/tasks.module';

@Module({
  imports: [
    UserCoursesModule,
    CoursesModule,
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
      entities: [Users, TasksCategory, Tasks],
      synchronize: true,
    }),
    UsersModule,
    AuthenticationModule,
    TasksModule,
    TasksCategoryModule,
  ],
  controllers: [UserCoursesController, AppController],
  providers: [UserCoursesService, AppService],
})
export class AppModule {}
