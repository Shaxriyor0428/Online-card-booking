import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class ClientAccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        "Token is in an incorrect format. Expected format is 'Bearer <token>'.",
      );
    }

    let decoded: any;
    try {
      decoded = this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      });
      request['user'] = decoded;
    } catch (error) {
      console.error(error);

      try {
        decoded = this.jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        request['user'] = decoded;
      } catch (error) {
        console.error(error);
        throw new UnauthorizedException('Invalid or expired token.');
      }
    }
    const method = request.method;
    if (
      decoded.role === 'admin' ||
      (decoded.role === 'superadmin' &&
        (method === 'PATCH' || method === 'DELETE'))
    ) {
      throw new UnauthorizedException(
        'Admin users are not allowed to modify or delete client data.',
      );
    }

    const id = request.params?.id;
    const isGetRequest = request.method === 'GET';
    const isAdmin = decoded.role === 'admin';

    if (id) {
      if (
        decoded.role === 'admin' ||
        (decoded.role === 'superadmin' && method === 'GET')
      ) {
        return true;
      }
      {
        throw new UnauthorizedException(
          'Admin users are not allowed to modify or delete client data.',
        );
      }
    }
    if (isGetRequest || (decoded && !isAdmin)) {
      return true;
    }

    if (id && isAdmin) {
      throw new UnauthorizedException(
        'Admins are not allowed to modify client data.',
      );
    }

    if (id && decoded.id != id) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource.',
      );
    }
    return true;
  }
}
