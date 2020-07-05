import {
    Resolver,
    Query,
    Authorized,
    Mutation
} from 'type-graphql'
import { MyObject } from './MyObject'

@Resolver()
export class MyResolver{
    @Query()
    publicQuery(): MyObject {
        return {
            publicField: "Some public data",
            authorizedField: "Data for logged users only",
            adminField: "Top secret info for admin"
        }
    }

    @Authorized("ADMIN")
    @Query()
    authedQuery(): string {
        return "Authorzed users only!"
    }

    @Authorized("ADMIN", "MODERATOR")
    @Mutation()
    adminMutation(): string {
        return "You are an admin/moderator, you can safely drop the database ;)"
    }
}