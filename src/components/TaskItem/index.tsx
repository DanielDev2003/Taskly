import { Text, TouchableOpacity, View } from 'react-native';
import { style } from "./style";
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../../interfaces/Task';

interface TaskItemProps {
    task:Task;
    onToggleComplete: () => void;
}

export function TaskItem({ task,  onToggleComplete}: TaskItemProps){
    const {title, description, status} = task;
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