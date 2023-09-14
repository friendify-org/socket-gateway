import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('vo day')
    const req: Request = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers['Authorization'];
    if (!authorizationHeader) throw new UnauthorizedException();
    const token: string = authorizationHeader.split(' ')[2];
    if (!token) throw new UnauthorizedException();
    console.log("token si:", token)

    return true;
  }
}
