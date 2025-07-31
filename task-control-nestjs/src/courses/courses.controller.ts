import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateCoursesDto } from './create-courses.dto';
import { UpdateCoursesDto } from './update-courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCourseDto: CreateCoursesDto) {
    return this.coursesService.create(createCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCoursesDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.delete(+id);
  }
}
