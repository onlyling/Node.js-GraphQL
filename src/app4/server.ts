// import { PrismaClient } from '@prisma/client'
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-koa'
import { address } from 'ip'
import * as Koa from 'koa'
import * as KoaBody from 'koa-body'
// import * as KoaRouter from 'koa-router'

import { schema } from './schema'

// const prisma = new PrismaClient()

const startApolloServer = async () => {
  const PORT = 3034
  const app = new Koa()

  const server = new ApolloServer({
    schema,
    // 向 GraphQL/resolve 中注入 context
    context: ({ ctx }) => ({ ...ctx }),
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  })

  await server.start()

  app.use(KoaBody())

  server.applyMiddleware({ app, path: '/graphql' })

  app.use(ctx => {
    console.log(ctx.request.url)
    ctx.body = '暂时不提供服务'
  })

  app.listen(PORT, () => {
    console.log(
      [
        ' Server running at:',
        `- Local:   http://localhost:${PORT}`,
        `- Network: http://${address()}:${PORT}`,
      ].join('\n'),
    )
  })
}

startApolloServer()
