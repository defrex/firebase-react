import { Request, Response } from 'express'
import { ApolloServer } from 'apollo-server-cloud-functions'
import { buildSchema } from 'type-graphql'
import { HelloWorldResolver } from './resolvers'

export const apiServer = async (req: Request, res: Response) => {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
  })

  if (req.url === '/api') req.url = '/'

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: false,
  })

  return apolloServer.createHandler({ cors: { origin: '*' } })(req, res)
}
