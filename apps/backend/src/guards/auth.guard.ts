import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthJwtService } from '../jwt/jwt.service';
import { AuthRequest } from './types';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(private readonly authJwtService: AuthJwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.authJwtService.verifyAccessToken(token);
      request.user = payload;
      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
