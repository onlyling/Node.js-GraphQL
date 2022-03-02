import { objectType, extendType, nonNull, list } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('body')
    t.boolean('published')
  },
})

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('posts', {
      type: 'Post',
      resolve(source, args, ctx) {
        console.log(ctx)
        return Promise.resolve([
          {
            id: 1,
            title: '??',
            body: '!!!',
            published: false,
          },
        ])
      },
    })
  },
})
