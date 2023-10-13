import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Animal } from './entities/animal.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalDto } from './dto/animal.dto';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entities';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private animalRepository: Repository<Animal>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(animal: AnimalDto) {
    const UserFound = this.userRepository.findOne({
      where: {
        id: animal.ownerId,
      },
    });
    if (UserFound) {
      const newAnimal = this.animalRepository.create(animal);
      await this.animalRepository.save(newAnimal);
    }

    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  findAll() {
    return this.animalRepository.find({});
  }

  findOne(id: number) {
    return this.animalRepository.findOne({
      where: {
        id,
      },
    });
  }

  // Servicio para actualizar un animal por su ID
  async update(id: number, updateAnimalDto: AnimalDto): Promise<Animal> {
    // Buscar el animal por su ID en la base de datos
    const animal = await this.animalRepository.findOne({
      where: {
        id,
      },
    });

    // Si no se encuentra el animal, lanzar una excepción
    if (!animal) {
      throw new NotFoundException(`Animal no encontrado`);
    }

    // Actualizar los campos del animal con los valores del DTO
    Object.assign(animal, updateAnimalDto);

    // Guardar los cambios en la base de datos
   await this.animalRepository.save(animal);
    return new HttpException('Animal Actualizado', HttpStatus);
  }

  async remove(id: number): Promise<void> {
    // Buscar el animal por su ID en la base de datos
    const animal = await this.animalRepository.findOne({
      where: {
        id,
      },
    });

    // Si no se encuentra el animal, lanzar una excepción
    if (!animal) {
      throw new NotFoundException(`Animal no encontrado`);
    }

    // Eliminar el animal de la base de datos
    await this.animalRepository.remove(animal);
    return new HttpException('Animal Eliminado', HttpStatus.ACCEPTED);
  }
}
