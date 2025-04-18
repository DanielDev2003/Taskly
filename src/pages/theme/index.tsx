import React from "react";

import { Image, Text, TouchableOpacity, View }  from 'react-native';
import { style } from "./styles";
import logo from '../../assets/logo.png';
import {themes} from '../../global/themes'

export default function Theme(){
    return(
        <View style={style.container}>
            <View style={style.boxtop}>
                <Image 
                source={logo}
                style={style.logo}
                resizeMode="contain"
                />
            </View>
            <View style={style.boxmid}>
                <Text style={style.title}>A simple to-do list app</Text>
                <Text style={style.subtitle}>Organize your tasks effectively</Text>
            </View>
            <View style={style.boxbottom}>
                <TouchableOpacity style={style.button}>
                <Text style={style.buttonText}>Taskly</Text>
                </TouchableOpacity>
            </View>
            <Text style={style.textBottom}>Application page <Text style={{color:themes.colors.primary}}>theme</Text></Text>
        </View>
    )
}