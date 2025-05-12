import {Dimensions, StyleSheet } from "react-native";
import {themes} from '../../global/themes'

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
})