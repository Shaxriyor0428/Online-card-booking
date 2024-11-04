import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const GetCurrentClientId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;

    if (!user) {
      throw new NotFoundException('Client not found');
    }

    return user.id;
  },
);
