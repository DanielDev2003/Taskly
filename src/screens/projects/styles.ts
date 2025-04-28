import {Dimensions, StyleSheet } from "react-native";
import {themes} from '../../global/themes'

export const  style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:themes.colors.background,
        padding:30
    },
    boxTop:{
        width: "100%",
        height:Dimensions.get('window').height/10,
        alignItems:'center',
        padding:10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        color:themes.colors.text,
        marginBottom: 8,
    },
    button:{
        width:30,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:themes.colors.secondary,
        borderRadius: 120,
    },
    buttonText:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    }
})