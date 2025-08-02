import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateUserCoursesDto } from './create-user-courses.dto';
import { UpdateUserCoursesDto } from './update-user-courses.dto';
import { UserCoursesService } from './user-courses.service';

@Controller('user-courses')
export class UserCoursesController {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserCoursesDto: CreateUserCoursesDto) {
    return this.userCoursesService.create(createUserCoursesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCoursesDto: UpdateUserCoursesDto,
  ) {
    return this.userCoursesService.update(+id, updateUserCoursesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userCoursesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userCoursesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.userCoursesService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: number) {
    return this.userCoursesService.findByCourseId(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/course/:courseId')
  findByUserAndCourse(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number,
  ) {
    return this.userCoursesService.findByUserAndCourse(userId, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/course/:courseId/progress')
  findByUserAndCourseProgress(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number,
  ) {
    return this.userCoursesService.findByUserAndCourse(userId, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/course/:courseId/status')
  findByUserAndStatus(
    @Param('userId') userId: number,
    @Param('status') status: string,
  ) {
    return this.userCoursesService.findByUserAndStatus(userId, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/progress/:progress')
  findByUserAndProgress(
    @Param('userId') userId: number,
    @Param('progress') progress: number,
  ) {
    return this.userCoursesService.findByUserAndProgress(userId, progress);
  }
}
