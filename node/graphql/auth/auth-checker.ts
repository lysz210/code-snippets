import {
    AuthChecker
} from 'type-graphql'
import { User } from './user';

export const customAuthChecker: AuthChecker<any> = ({ context }, roles) => {
    const user: User = context.user
    console.log(user, roles)
    if (roles.length === 0) {
        return user != undefined
    }
    if (!user) {
        return false
    }
    if (user.roles?.some(role => roles.includes(role))) {
        return true
    }
    
    return false;
}