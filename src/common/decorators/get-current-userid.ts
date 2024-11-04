import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from '../types';

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ): string | number | boolean | JwtPayloadWithRefreshToken => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user as JwtPayloadWithRefreshToken;

    if (!user) {
      throw new ForbiddenException('Token incorrect');
    }

    return data ? user[data] : user;
  },
);
