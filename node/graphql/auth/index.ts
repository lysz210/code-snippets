import 'reflect-metadata'
import express from 'express'
import { ApolloServer, UserInputError } from 'apollo-server-express'
import { schema } from './schema'
import { User } from './user'
import { ContextType } from './context'

const app = express()
const path = '/graphql'
const users: {[key: string]: User} = {
    "admin": {
        username: 'admin',
        roles: [ 'ADMIN' ]
    },
    "moderator": {
        username: 'moderator',
        roles: [ 'MODERATOR' ]
    },
    'user': {
        username: 'user',
        roles: [ 'LOGIN' ]
    }
}

async function main() {
    let currentUser!: User;
    const server = new ApolloServer({
        schema: await schema,
        context: ({req}) => {
            let context: ContextType = {}
            if (currentUser) {
                context.user = currentUser
            }
            return context;
        }
    })
    app.use(path, (req, res, next) => {
        console.log(req.params)
        const username: string = req.query.username as string
        console.log(req.query)
        if (username && users[username]) {
            currentUser = users[username]
        }
        next()
    })
    server.applyMiddleware({ app, path })
    // Launch the express server
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
    );
}

main()