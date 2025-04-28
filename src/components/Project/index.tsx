import { Text, TouchableOpacity, View } from 'react-native';
import { style } from "./style";

interface ProjectItemProps {
    title: string;
    taskName: string;
}


export function Project({title, taskName}:ProjectItemProps){
    return (
        <View style={style.projectItem}>
            <Text style={style.title}>{title}</Text>
            <Text style={style.taskName}>{taskName}</Text>
        </View>
    )
}