import { address } from 'ip'
import * as Koa from 'koa'
import * as KoaBody from 'koa-body'
import * as KoaRouter from 'koa-router'

import { getGraphQL } from './graphql'

// TODO config
const PORT = 3031
const app = new Koa()
const router = new KoaRouter()

router.post('/graphql', ctx => {
  // ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`
  console.log(`Request Body: ${JSON.stringify(ctx.request.body)}`)

  getGraphQL(ctx)
})

app.use(KoaBody())

app.use(router.routes())

app.use(ctx => {
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

// getGraphQL('{ hello }').then(response => {
//   console.log(response)
// })
