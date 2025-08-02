import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './create-subjects.dto';
import { UpdateSubjectDto } from './update-subjects.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectsService.delete(+id);
  }

  @Get('course')
  findByCourseId(@Query('courseId') courseId: string) {
    return this.subjectsService.findByCourseId(+courseId);
  }

  @Get('name')
  findByName(@Query('name') name: string) {
    return this.subjectsService.findByName(name);
  }

  @Get('workload')
  findByWorkload(@Query('workload') workload: string) {
    return this.subjectsService.findByWorkload(+workload);
  }

  @Get('mandatory')
  findByIsMandatory(@Query('isMandatory') isMandatory: string) {
    return this.subjectsService.findByIsMandatory(isMandatory === 'true');
  }
}
