import { graphql, buildSchema } from 'graphql'

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello: () => {
    return 'Hello world!'
  },
}

// // Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: '{ hello }',
//   rootValue
// }).then((response) => {
//   console.log(response);
// });

// ----- schema type start -----
// class GraphQLSchema {
//   constructor(config: GraphQLSchemaConfig)
// }
// type GraphQLSchemaConfig = {
//   query: GraphQLObjectType;
//   mutation?: ?GraphQLObjectType;
// }
// ----- schema type end -----

export const getGraphQL = (source: string) => {
  return graphql({
    schema,
    source,
    rootValue,
  })
}
