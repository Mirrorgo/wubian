import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// @CurrentUser() user
// user.id user.email user.name
// 这样可以直接获取对应的用户id
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
