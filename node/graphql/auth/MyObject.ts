import {
    ObjectType,
    Field,
    Authorized
} from 'type-graphql'

@ObjectType()
export class MyObject {
    @Field()
    publicField!: string

    @Authorized()
    @Field()
    authorizedField!: string

    @Authorized('ADMIN')
    @Field()
    adminField!: string

    @Authorized(['ADMIN', 'MODERATOR'])
    @Field({nullable: true})
    hiddenField?: string
}