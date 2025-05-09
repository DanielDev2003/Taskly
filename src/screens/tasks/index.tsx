import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { style } from './styles';
import { TaskModal } from '../../components/TaskModal';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../interfaces/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState('')


  useEffect(()=>{
    async function getData() {
      try{
        const data = await AsyncStorage.getItem("@TasklyApp:tasks");
        const tasksData = data != null? JSON.parse(data):[];
        setTasks(tasksData)
      }catch(e){

      }
    }

    getData()
  }, [])

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

  function handleDeleteTask() {
     
    if (!selectedTask) return;
    const filtered = tasks.filter(task => task.id !== selectedTask.id);
    setTasks(filtered);
    AsyncStorage.setItem("@TasklyApp:tasks",JSON.stringify(filtered))
    resetModal()
  } // delete Task

  function handleToggleComplete(id: string) {
    const completedTask: Task[] = tasks.map(task=>
      task.id === id? {...task, status:!task.status}: task
    );
    setTasks(completedTask)
    AsyncStorage.setItem("@TasklyApp:tasks",JSON.stringify(completedTask))
  } // Toggle Task

  function handleOpenEditModal(task: Task) {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setModalVisible(true);
  } // Modal for Edit Task

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.title}>My Tasks</Text>
        <Text>{text}</Text>
        <TouchableOpacity style={style.button} onPress={() => setModalVisible(true)}>
          <Text style={style.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenEditModal(item)}>
            <TaskItem
              task={item}
              onToggleComplete={() => handleToggleComplete(item.id)}
            />
          </TouchableOpacity>
        )}
      />

      <TaskModal
        visible={modalVisible}
        onClose={resetModal}
        onSave={selectedTask ? handleUpdateTask : handleAddTask}
        onDelete={handleDeleteTask}
        isEditing={selectedTask? true:false}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      />
    </View>
  );
}
