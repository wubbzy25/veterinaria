import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(user: RegisterUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [{ gmail: user.gmail }],
      });
      if (existingUser) {
        // Lanzar una excepción si se encuentra un usuario duplicado
        throw new BadRequestException('Usuario Duplicado');
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      const newUser = this.userRepository.create(user);
      this.userRepository.save(newUser);

      // Si no se encuentra un usuario duplicado, el registro se considera exitoso
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-lanzar la excepción HTTP
      }
      throw new HttpException(
        'Error al registrar usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(user: LoginUserDto) {
    try {
      const UserAuth = await this.userRepository.findOne({
        where: {
          gmail: user.gmail,
        },
      });
      if (UserAuth) {
        const passwordMatch = await bcrypt.compare(
          user.password,
          UserAuth.password,
        );
        if (passwordMatch) {
          const payload = {
            userId: UserAuth.id,
            gmail: UserAuth.gmail,
            Role: UserAuth.Role,
          };
          return {
            message: 'Logeado Exitosamente',
            access_token: await this.jwtService.signAsync(payload),
          };
        } else {
          throw new BadRequestException('La contraseña no es correcta');
        }
      } else {
        throw new NotFoundException(
          'El correo electrónico no existe o esta incorrecto',
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-lanzar la excepción HTTP
      }
      throw new HttpException(
        'Error al logear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
