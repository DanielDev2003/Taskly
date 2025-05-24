import { StyleSheet } from "react-native";
import { themes } from '../../constants/themes';

export const style = StyleSheet.create({
    userItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title:{
      fontSize: 20,
      fontWeight: '600',
      color:themes.colors.text,
      marginBottom: 8,
    },
    password:{
      fontSize: 20,
      fontWeight: '600',
      color:themes.colors.text,
      marginBottom: 8,
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