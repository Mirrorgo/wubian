import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// @CurrentUser() user
// user.id user.email user.name
// 这样可以直接获取对应的用户id
// 注意： 如果没有@UseGuards(JwtAuthGuard)在最上面一行，则没有这个效果

/**
 * A custom parameter decorator to extract the current user from the request.
 *
 * @remarks
 * This decorator requires the `@UseGuards(JwtAuthGuard)` to be applied at the controller or method level.
 *
 * @returns The current user object with properties like id, email, and name.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
