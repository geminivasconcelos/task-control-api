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

@Controller('tasks-category')
export class TasksCategoryController {
  constructor(private readonly tasksCategoryService: TasksCategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCategoryDto: any) {
    return this.tasksCategoryService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.tasksCategoryService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tasksCategoryService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: any) {
    return this.tasksCategoryService.update(id, updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksCategoryService.delete(id);
  }
}
