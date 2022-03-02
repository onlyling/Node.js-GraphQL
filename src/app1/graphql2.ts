import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import type { Context } from 'koa'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        // type GraphQLFieldResolveFn = (
        //   source?: any,
        //   args?: {[argName: string]: any},
        //   context?: any,
        //   info?: GraphQLResolveInfo
        // ) => any
        // type GraphQLResolveInfo = {
        //   fieldName: string,
        //   fieldNodes: Array<Field>,
        //   returnType: GraphQLOutputType,
        //   parentType: GraphQLCompositeType,
        //   schema: GraphQLSchema,
        //   fragments: { [fragmentName: string]: FragmentDefinition },
        //   rootValue: any,
        //   operation: OperationDefinition,
        //   variableValues: { [variableName: string]: any },
        // }
        resolve(_, __, ctx: Context) {
          console.log(ctx.request.body.query)
          return 'haha'
        },
      },
    },
  }),
})

export const getGraphQL = (source: string, contextValue: Context) => {
  return graphql({
    schema,
    source,
    contextValue,
  })
}
