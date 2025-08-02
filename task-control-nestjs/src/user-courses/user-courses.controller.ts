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

@Controller('user-courses')
export class UserCoursesController {
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserCoursesDto: CreateUserCoursesDto) {
    return 'UserCoursesService.create(createUserCoursesDto);';
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCoursesDto: UpdateUserCoursesDto,
  ) {
    return `UserCoursesService.update(${id}, ${JSON.stringify(updateUserCoursesDto)});`;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return 'UserCoursesService.findAll();';
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return `UserCoursesService.findOne(${id});`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return `UserCoursesService.findByUser(${userId});`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('course/:courseId')
  findByCourse(@Param('courseId') courseId: number) {
    return `UserCoursesService.findByCourse(${courseId});`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/course/:courseId')
  findByUserAndCourse(
    @Param('userId') userId: number,
    @Param('courseId') courseId: number,
  ) {
    return `UserCoursesService.findByUserAndCourse(${userId}, ${courseId});`;
  }
}
