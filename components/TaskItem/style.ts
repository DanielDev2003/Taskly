import { StyleSheet } from "react-native";
import { themes } from '../../constants/themes';

export const style = StyleSheet.create({
    taskItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    taskInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkIcon: {
        marginRight: 12,
    },
    title:{
        fontSize: 20,
        fontWeight: '600',
        color:themes.colors.text,
        marginBottom: 8,
    },
    description:{
        fontSize: 15,
        color:themes.colors.muted,
        textAlign: 'center',
        marginBottom: 30,
    },
    status: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF',
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

})