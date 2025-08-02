import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksCategoryService } from './tasks-category.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTasksCategoryDto } from './create-tasks-category.dto';
import { UpdateTasksCategoryDto } from './update-tasks-category.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('tasks-category')
export class TasksCategoryController {
  constructor(private readonly tasksCategoryService: TasksCategoryService) {}

 @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateTasksCategoryDto) {
    return this.tasksCategoryService.create(createCategoryDto);
  }

 @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tasksCategoryService.findAll();
  }

 @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksCategoryService.findOne(id);
  }

 @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateTasksCategoryDto,
  ) {
    return this.tasksCategoryService.update(id, updateCategoryDto);
  }

 @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksCategoryService.delete(id);
  }
}
