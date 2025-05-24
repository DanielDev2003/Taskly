import { themes } from '@/constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TaskModal } from '../../components/modals/TaskModal';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../interfaces/Task';


export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState('')


  useFocusEffect(
    useCallback(() => {
      async function getData() {
        try {
          const data = await AsyncStorage.getItem("@TasklyApp:tasks");
          const tasksData = data != null ? JSON.parse(data) : [];
          setTasks(tasksData);
        } catch (e) {

        }
      }

      getData();
    }, [])
  );

  useEffect (()=>{
    (async () => {

      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [])

  let text = 'Waiting..';
  if(errorMsg){
    text = errorMsg;
  }else if (location){
    text = JSON.stringify(location);
  }

  function handleAddTask() {
    if (title.trim() === '' || description.trim() === '') return;

    const newTask: Task = {
      id: String(new Date().getTime()),
      title,
      description,
      status: false,
    };

    const taskPlus: Task[] = [
      ...tasks,
      newTask
    ];

    setTasks(taskPlus);
    AsyncStorage.setItem("@TasklyApp:tasks",JSON.stringify(taskPlus))
    resetModal()
  } // add Task

  function resetModal(){
    setSelectedTask(null);
    setTitle('')
    setDescription('')
    setModalVisible(false)
  }

  function handleUpdateTask() {
    if (!selectedTask) return;
    if (title.trim() === '' || description.trim() === '') return;
    const updatedTasks = tasks.map(task =>
      task.id === selectedTask.id
        ? { ...task, title, description }
        : task
    );
    setTasks(updatedTasks);
    AsyncStorage.setItem("@TasklyApp:tasks",JSON.stringify(updatedTasks))
    resetModal()
  } //edit Task

  function handleDeleteTask(id: string) {
    const filtered = tasks.filter(task => task.id !== id);
    setTasks(filtered);
    AsyncStorage.setItem("@TasklyApp:tasks", JSON.stringify(filtered));
  }

   // delete Task

  function handleToggleComplete(id: string) {
    const completedTask: Task[] = tasks.map(task=>
      task.id === id? {...task, status:!task.status}: task
    );
    setTasks(completedTask)
    AsyncStorage.setItem("@TasklyApp:tasks",JSON.stringify(completedTask))
  } // Toggle Task


  const navigateToDetails = (selectedTask : Task) => {
    router.push({pathname: '/screens/tasks/TaskScreenDetail', params: {taskId : selectedTask.id}})
  }

  const navigateToAdd = () => {
    router.push({pathname: '/screens/tasks/TaskAdd'})
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.title}>My Tasks</Text>
        <Text>{text}</Text>
        <TouchableOpacity style={style.button} onPress={() => navigateToAdd()}>
          <Text style={style.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <TaskItem
              task={item}
              onToggleComplete={() => handleToggleComplete(item.id)}
              onEdit={()=> router.push({
                pathname: '/screens/tasks/TaskEdit',
                params: {taskId:item.id}
              })
              }
              onDelete={()=> handleDeleteTask(item.id)}
            />
          </TouchableOpacity>
        )}
      />

      <TaskModal
        visible={modalVisible}
        onClose={resetModal}
        onSave={selectedTask ? handleUpdateTask : handleAddTask}
        onDelete={() => selectedTask && handleDeleteTask(selectedTask.id)}
        isEditing={selectedTask? true:false}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
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