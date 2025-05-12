import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { style } from './styles';
import { UserModal } from '../../components/UserModal';
import { User } from '../../interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'
import { UserItem } from '../../components/UserItem';

export default function Tasks() {
  const [tasks, setTasks] = useState<User[]>([]);
  const [name, setTitle] = useState('');
  const [password, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<User | null>(null);
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

  function handleAddTask() {
    if (name.trim() === '' || password.trim() === '') return;

    const newTask: User = {
      id: String(new Date().getTime()),
      name,
      password,
    };

    const taskPlus: User[] = [
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
    if (password.trim() === '' || password.trim() === '') return;
    const updatedTasks = tasks.map(task =>
      task.id === selectedTask.id
        ? { ...task, name, password }
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

  function handleOpenEditModal(user: User) {
    setSelectedTask(user);
    setTitle(user.name);
    setDescription(user.password);
    setModalVisible(true);
  } // Modal for Edit Task

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.title}>Users</Text>
        <TouchableOpacity style={style.button} onPress={() => setModalVisible(true)}>
          <Text style={style.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenEditModal(item)}>
            <UserItem
              user={item}
            />
          </TouchableOpacity>
        )}
      />

      <UserModal
        visible={modalVisible}
        onClose={resetModal}
        onSave={selectedTask ? handleUpdateTask : handleAddTask}
        onDelete={handleDeleteTask}
        isEditing={selectedTask? true:false}
        name={name}
        password={password}
        setTitle={setTitle}
        setDescription={setDescription}
      />
    </View>
  );
}
