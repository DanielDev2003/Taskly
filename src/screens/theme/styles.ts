import { Dimensions, StyleSheet } from "react-native";
import {themes} from '../../global/themes'

export const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:themes.colors.background,
        alignItems:"center",
        justifyContent:"center"
    },
    boxtop:{
        height:Dimensions.get('window').height/4,
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    boxmid:{
        height:Dimensions.get('window').height/3,
        width:"100%",
        alignItems:"center",
        justifyContent:"center"

    },
    boxbottom:{
        height:Dimensions.get('window').height/4,
        alignItems:"center",
        width:"100%",
    },
    logo:{
        width: 250,
        height: 250,
        marginBottom: 24,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        color:themes.colors.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 25,
        color:themes.colors.muted,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        width:150,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:themes.colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    },
    textBottom:{
        color:themes.colors.text,
        fontSize:15,
        fontWeight:"300"
    }
})