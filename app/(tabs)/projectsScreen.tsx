import { ProjectItem } from '@/components/ProjectItem';
import { themes } from '@/constants/themes';
import { Project } from '@/interfaces/Project';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Projects() {
  const [tasks, setTasks] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [taskName, setTaskName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Project | null>(null);


  useFocusEffect(
    useCallback(() => {
      async function getData() {
        try {
          const data = await AsyncStorage.getItem("@TasklyApp:projects");
          const tasksData = data != null ? JSON.parse(data) : [];
          setTasks(tasksData);
        } catch (e) {

        }
      }

      getData();
    }, [])
  );


  function handleAddTask() {
    if (title.trim() === '' || taskName.trim() === '') return;

    const newTask: Project = {
      id: String(new Date().getTime()),
      title,
      taskName,
    };

    const taskPlus: Project[] = [
      ...tasks,
      newTask
    ];

    setTasks(taskPlus);
    AsyncStorage.setItem("@TasklyApp:projects",JSON.stringify(taskPlus))
  } // add Task


  function handleDeleteTask(id: string) {
    const filtered = tasks.filter(task => task.id !== id);
    setTasks(filtered);
    AsyncStorage.setItem("@TasklyApp:projects", JSON.stringify(filtered));
  }

  const navigateToDetails = (selectedTask : Project) => {
    router.push({pathname: '/screens/projects/ProjectScreenDetail', params: {taskId : selectedTask.id}})
  }

  const navigateToAdd = () => {
    router.push({pathname: '/screens/projects/ProjectAdd'})
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.title}>My Projects</Text>
        <TouchableOpacity style={style.button} onPress={() => navigateToAdd()}>
          <Text style={style.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <ProjectItem
              title={item.title}
              taskName={item.taskName}
              onEdit={()=> router.push({
                pathname: '/screens/projects/ProjectEdit',
                params: {projectId:item.id}
              })
              }
              onDelete={()=> handleDeleteTask(item.id)}
            />
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const style = StyleSheet.create({
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