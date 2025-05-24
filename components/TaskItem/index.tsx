import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../../interfaces/Task';
import { style } from "./style";

interface TaskItemProps {
    task:Task;
    onToggleComplete: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function TaskItem({ task,  onToggleComplete, onEdit, onDelete}: TaskItemProps){
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