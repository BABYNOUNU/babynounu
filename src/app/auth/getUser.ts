import { createParamDecorator, ExecutionContext, Get } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user; // extract a specific property only if specified or get a user object
  },
);