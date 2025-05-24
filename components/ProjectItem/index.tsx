import { themes } from '@/constants/themes';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProjectItemProps {
    title:string;
    taskName:string;
    onEdit: ()=>void;
    onDelete: ()=>void;
}

export function ProjectItem({title, taskName, onEdit, onDelete}:ProjectItemProps){
    return (
        <View style={style.projectItem}>
            <View style={style.taskInfo}>

                <View>

                    <Text style={style.title}>{title}</Text>
                    <Text style={style.taskName}>{taskName}</Text>
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

const style = StyleSheet.create({
  projectItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    title:{
        fontSize: 20,
        fontWeight: '600',
        color:themes.colors.text,
        marginBottom: 8,
        textAlign:'center'
    },
    taskName:{
        fontSize: 15,
        color:themes.colors.text,
        marginBottom: 30,
    },
     actionButtons: {
        flexDirection: 'row',
        marginLeft: 'auto',
        gap: 8,
    },

    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },

    editButton: {
        backgroundColor: '#10B981', // verde
    },

    deleteButton: {
        backgroundColor: '#EF4444', // vermelho
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    taskInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});