import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { getShadowData } from '../shadow-agent'

export const ShadowAgent = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()

  return getShadowData(request)
})
