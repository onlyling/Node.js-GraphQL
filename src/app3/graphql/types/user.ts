import { GraphQLObjectType, GraphQLEnumType, GraphQLString } from 'graphql'

const UserGroupEnum = new GraphQLEnumType({
  name: 'UserGroup',
  values: {
    F: {
      value: 'Front-End',
    },
    B: {
      value: 'Backend',
    },
  },
})

export const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    group: {
      type: UserGroupEnum,
    },
  },
})
