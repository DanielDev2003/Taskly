import { Text, TouchableOpacity, View } from 'react-native';
import { style } from "./style";
import { Ionicons } from '@expo/vector-icons';

interface TaskItemProps {
    title: string;
    description: string;
    status: boolean;
    onToggleComplete: () => void;
}

export function Task({ title, description, status , onToggleComplete}: TaskItemProps){
    return (
        <View style={style.taskItem}>
            <View style={style.taskInfo}>
                <TouchableOpacity onPress={onToggleComplete}>
                    <Ionicons
                        name={status ? "checkbox" : "square-outline"}
                        size={24}
                        color={status ? "#10B981" : "#374151"}
                        style={style.checkIcon}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={[style.title, status && style.status]}>{title}</Text>
                    <Text style={[style.description, status && style.status]}>{description}</Text>
                </View>
            </View>
            
        </View>
    )
}