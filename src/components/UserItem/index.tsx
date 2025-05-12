import { Text, View } from 'react-native';
import { style } from "./styles" 
import {User} from "../../interfaces/User"

interface UserItemProps{
    user:User
}


export function UserItem({ user }: UserItemProps){
    const {name, password} = user;
    return (
        <View style={style.userItem}>
            <View style={style.userInfo}>
                <View>
                    <Text style={style.title}>User name: {name}</Text>
                    <Text style={style.password}>Password: {password}</Text>
                </View>
            </View>
            
        </View>
    )
}