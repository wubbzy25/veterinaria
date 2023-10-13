import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/role.decorator';
import { AnimalDto } from './dto/animal.dto';
import { Role } from '../auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() Animal: AnimalDto) {
    return this.animalsService.create(Animal);
  }

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() Animal: AnimalDto) {
    return this.animalsService.update(+id, Animal);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
