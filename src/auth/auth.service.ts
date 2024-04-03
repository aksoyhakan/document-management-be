import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponseDto } from './dto/login-user-response';
import { ResponseCreator } from 'utils/ResponseCreater';
import * as dotenv from 'dotenv';
import { CreateUserResponseDto } from './dto/create-user-response';
import { EmailExistinceException } from 'exceptions/user-exceptions/user.emailexistance.exception copy';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto): Promise<CreateUserResponseDto> {
    const searchUser = await this.getByMail(user.email);
    if (searchUser) throw new EmailExistinceException(user.email);

    const hashPassword = await bcrypt.hashSync(user.password, 12);
    user.password = hashPassword;
    const newUser = await this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);
    return ResponseCreator.constructRegistResponse(savedUser.id);
  }

  async getByMail(email: string): Promise<User> {
    try {
      const searchUser = await this.userRepository.findOne({
        where: {
          email,
        },
      });

      return searchUser;
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async login(userLogin: LoginUserDto): Promise<LoginUserResponseDto> {
    const searchUser = await this.getByMail(userLogin.email);

    if (!searchUser) throw new BadRequestException('Invalid credentials');
    if (
      !(await bcrypt.compareSync(
        userLogin.password,
        (await searchUser).password,
      ))
    ) {
      throw new BadRequestException('Invalid credential');
    }

    const jwt = await this.jwtService.signAsync({
      subject: (await searchUser).id,
      name: (await searchUser).name,
    });

    return ResponseCreator.constructLoginResponse(
      (await searchUser).name,
      await jwt,
    );
  }
}
