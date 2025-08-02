import { UserSubjectsModule } from './user-subjects/user-subjects.module';
import { UserSubjectsController } from './user-subjects/user-subjects.controller';
import { SubjectsModule } from './subjects/subjects.module';
import { SubjectsService } from './subjects/subjects.service';
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
import { Courses } from './courses/courses.entity';
import { UserCourses } from './user-courses/user-courses.entity';
import { Subjects } from './subjects/subjects.entity';
import { UserSubjects } from './user-subjects/user-subjects.entity';

@Module({
  imports: [
    UserSubjectsModule,
    SubjectsModule,
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
      entities: [
        Users,
        TasksCategory,
        Tasks,
        Courses,
        UserCourses,
        Subjects,
        UserSubjects,
      ],

      synchronize: true,
    }),

    UsersModule,
    AuthenticationModule,
    TasksModule,
    TasksCategoryModule,
    UserCoursesModule,
    CoursesModule,
  ],
  controllers: [UserSubjectsController, UserCoursesController, AppController],
  providers: [SubjectsService, UserCoursesService, AppService],
})
export class AppModule {}
