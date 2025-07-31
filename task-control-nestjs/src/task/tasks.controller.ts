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
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';
import { CreateTaskDto } from './create-tasks.dto';
import { UpdateTasks } from './update-tasks.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller('tasks')
export class TasksContcroller {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(): Promise<Tasks[]> {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<Tasks | null> {
    return this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/:status')
  getTasksByStatus(@Param('status') status: string) {
    return this.tasksService.findByStatus(status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('priority/:priority')
  getTasksByPriority(@Param('priority') priority: string) {
    return this.tasksService.findByPriority(priority);
  }

  @UseGuards(JwtAuthGuard)
  @Get('due/:date')
  getTasksByDueDate(@Param('date') date: string) {
    return this.tasksService.findByCreatedIn(date);
  }

  @UseGuards(JwtAuthGuard)
  @Get('interval/:start/:end')
  getTasksByInterval(@Param('start') start: string, @Param('end') end: string) {
    return this.tasksService.findByDateRange(start, end);
  }

  @UseGuards(JwtAuthGuard)
  @Get('category/:category')
  getTasksByCategory(@Param('category') category: number) {
    return this.tasksService.findByCategory(category);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() updateTask: UpdateTasks) {
    return this.tasksService.update(id, updateTask);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
