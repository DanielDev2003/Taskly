import {Dimensions, StyleSheet } from "react-native";
import {themes} from '../../global/themes'

export const style = StyleSheet.create({
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
})