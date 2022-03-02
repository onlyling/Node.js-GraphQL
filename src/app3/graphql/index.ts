import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  Source,
  GraphQLError,
  parse,
  validate,
  execute,
  validateSchema,
  getOperationAST,
  specifiedRules,
} from 'graphql'
import type {
  DocumentNode,
  ValidationRule,
  ExecutionArgs,
  ExecutionResult,
  FormattedExecutionResult,
  GraphQLFieldResolver,
  GraphQLTypeResolver,
  GraphQLFormattedError,
} from 'graphql'
import type { Context } from 'koa'

// https://graphql.org/graphql-js/constructing-types/
// https://github.com/graphql/express-graphql/blob/main/src/index.ts

const MOCK_DATA: {
  user: Record<
    string,
    {
      id: string
      name: string
    }
  >
} = {
  user: {
    '1': {
      id: '1',
      name: '你的名字1',
    },
    '2': {
      id: '2',
      name: '你的名字2',
    },
  },
}

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
})

// const UserInputType = new GraphQLObjectType({
//   name: 'UserInput',
//   fields: {
//     id: { type: GraphQLString },
//   },
// })

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: {
          id: { type: GraphQLString },
        },
        resolve(_, { id }, ctx: Context) {
          console.log(ctx.request.body.query)

          const u = MOCK_DATA.user[id]

          if (!u) {
            throw new Error('no user exists with id ' + id)
          }

          return u
        },
      },
    },
  }),
})

export const getGraphQL = (contextValue: Context) => {
  // return graphql({
  //   schema,
  //   source,
  //   contextValue,
  // })

  const { query, variables, operationName } = contextValue.request.body
  let documentAST: DocumentNode

  try {
    documentAST = parse(new Source(query, 'GraphQL request'))
  } catch (syntaxError: unknown) {
    // Return 400: Bad Request if any syntax errors errors exist.
    throw new Error('documentAST')
  }

  const result = execute({
    schema,
    document: documentAST,
    contextValue,
    variableValues: variables,
    operationName,
    // fieldResolver,
    // typeResolver,
  })

  contextValue.body = result
}
