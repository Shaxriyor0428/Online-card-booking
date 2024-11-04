import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

export const CookieGetter = createParamDecorator(
  (_: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const refreshToken = request.cookies?.['refresh_token'];

    if (!refreshToken) {
      throw new ForbiddenException('Token not found');
    }
    return refreshToken;
  },
);
