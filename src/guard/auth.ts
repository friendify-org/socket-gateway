import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';
import environment from 'src/config/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) throw new UnauthorizedException();
    const token: string = authorizationHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    const user = this.jwtService.verify(token, {
      secret: environment().jwtSecret,
    });
    if (!user.id) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
