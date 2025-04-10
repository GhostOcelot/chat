import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from 'jsonwebtoken';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthJwtService } from '../jwt/jwt.service';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly authJwtService: AuthJwtService
  ) {}

  async register(body: AuthDTO) {
    const { email, password } = body;
    try {
      const existingUser = await this.userRepo.findOne({ where: { email } });
      if (existingUser) throw new ConflictException('Email is already in use');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.userRepo.create({ email, password: hashedPassword });
      await this.userRepo.save(user);

      return { message: 'registration successful' };
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException(
        'An error occurred during registration'
      );
    }
  }

  async login(body: AuthDTO) {
    const { email, password } = body;
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) throw new UnauthorizedException('email or password incorrect');

      const isVerified = await bcrypt.compare(password, user.password);
      if (!isVerified)
        throw new UnauthorizedException('email or password incorrect');

      const accessToken = this.authJwtService.createAccessToken(user);
      const refreshToken = this.authJwtService.createRefreshToken(user);

      return { message: 'Login successful', accessToken, refreshToken };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new InternalServerErrorException('An error occurred during login');
    }
  }

  async refresh(token: string) {
    try {
      const refreshToken = this.authJwtService.verifyRefreshToken(token);
      const { email, id } = refreshToken;
      const newAccessToken = this.authJwtService.createAccessToken({
        email,
        id,
      } as User);

      return { accessToken: newAccessToken };
    } catch (err) {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError ||
        err instanceof NotBeforeError
      )
        throw new UnauthorizedException('Invalid or expired refresh token');
      throw new InternalServerErrorException('An error occurred during login');
    }
  }
}
