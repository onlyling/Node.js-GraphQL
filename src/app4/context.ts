// import type { PrismaClient } from '@prisma/client'
import type { Context as KoaContext } from 'koa'

// 给 resolve 的 context 添加类型

export interface Context extends KoaContext {
  // prisma: PrismaClient
}
