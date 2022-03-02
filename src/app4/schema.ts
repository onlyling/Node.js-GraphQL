import { join } from 'path'

import type { GraphQLSchema } from 'graphql'
import { makeSchema } from 'nexus'

import * as types from './graphql'

// 类型有误
// https://github.com/graphql-nexus/nexus/issues/1019
// 应该快有新版本了
// https://github.com/graphql-nexus/nexus/pull/977

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, 'nexus-typegen.ts'),
    schema: join(__dirname, 'schema.graphql'),
  },
  // 给 resolve 的 context 添加类型
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
}) as unknown as GraphQLSchema
