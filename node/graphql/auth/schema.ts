import { buildSchema } from "type-graphql";
import { MyResolver } from './resolver'
import { customAuthChecker } from './auth-checker'

export const schema = buildSchema({
    resolvers: [ MyResolver ],
    authChecker: customAuthChecker
})