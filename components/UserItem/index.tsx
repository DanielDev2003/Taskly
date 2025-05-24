import { Text, TouchableOpacity, View } from 'react-native';
import { User } from "../../interfaces/User";
import { style } from "./styles";

interface UserItemProps{
    user:User;
    onEdit: ()=>void;
    onDelete:()=>void;
}


export function UserItem({ user , onEdit, onDelete}: UserItemProps){
    const {name, password} = user;
    return (
        <View style={style.userItem}>
            <View style={style.userInfo}>
                <View>
                    <Text style={style.title}>User name: {name}</Text>
                    <Text style={style.password}>Password: {password}</Text>
                </View>
                <View style={style.actionButtons}>
                    <TouchableOpacity style={[style.button, style.editButton]} onPress={onEdit}>
                        <Text style={style.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.button, style.deleteButton]} onPress={onDelete}>
                        <Text style={style.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}