import { UserItem } from '@/components/UserItem';
import { themes } from '@/constants/themes';
import { User } from '@/interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Users() {
  const [tasks, setTasks] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  useFocusEffect(
    useCallback(() => {
      async function getData() {
        try {
          const data = await AsyncStorage.getItem("@TasklyApp:users");
          const tasksData = data != null ? JSON.parse(data) : [];
          setTasks(tasksData);
        } catch (e) {

        }
      }

      getData();
    }, [])
  );


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
    AsyncStorage.setItem("@TasklyApp:users",JSON.stringify(taskPlus))
  } // add Task


  function handleDeleteTask(id: string) {
    const filtered = tasks.filter(task => task.id !== id);
    setTasks(filtered);
    AsyncStorage.setItem("@TasklyApp:users", JSON.stringify(filtered));
  }

  const navigateToDetails = (selectedTask : User) => {
    router.push({pathname: '/screens/users/UserForDetail', params: {userId : selectedTask.id}})
  }

  const navigateToAdd = () => {
    router.push({pathname: '/screens/users/UserAdd'})
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.title}>Users</Text>
        <TouchableOpacity style={style.button} onPress={() => navigateToAdd()}>
          <Text style={style.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <UserItem
              user={item}
              onEdit={()=> router.push({
                pathname: '/screens/users/UserEdit',
                params: {userId:item.id}
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