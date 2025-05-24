import { themes } from '@/constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Task } from '../../interfaces/Task';


export default function TaskForDetail() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const {taskId} = useLocalSearchParams();
  const [taskForDetail, setTaskForDetail] = useState<Task>();

  useEffect(()=>{
    async function getData() {
      try{
        const data = await AsyncStorage.getItem("@TasklyApp:tasks");
        const tasksData = data != null? JSON.parse(data):[];
        setTasks(tasksData)

        tasksData.forEach((element:Task) => {
            if(element.id == taskId){
                setTaskForDetail(element);
            }
        });
      }catch(e){

      }
    }

    getData()
  }, [])

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.title}>Details</Text>
      </View>

      <View style={style.taskItem}>
        <Text style={style.title}>
            Title: {taskForDetail? taskForDetail.title : ''}
        </Text>
        <Text style={style.description}>
            Description: {taskForDetail? taskForDetail.description: ''}
        </Text>
        <Text style={style.completed}>
          Completed: {taskForDetail? (taskForDetail.status?'true':'false'): ''}
        </Text>
      </View>

    </View>
  );
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:themes.colors.background,
        padding:30
    },
    taskItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    boxTop:{
        width: "100%",
        height:Dimensions.get('window').height/10,
        alignItems:'center',
        padding:10,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        color:themes.colors.text,
        marginBottom: 8,
        textAlign: 'center'
    },
    description:{
        fontSize: 25,
        fontWeight: '600',
        color:themes.colors.text,
        marginBottom: 8,
        textAlign: 'center'
    },
    completed:{
        fontSize: 25,
        fontWeight: '600',
        color:themes.colors.text,
        marginBottom: 8,
        textAlign: 'center'
    },
    button:{
        width:30,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'red',
        borderRadius: 120,
    },
    buttonText:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    }
        
    
})