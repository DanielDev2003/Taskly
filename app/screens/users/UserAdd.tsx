import { themes } from '@/constants/themes';
import { User } from '@/interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
export default function UserAdd() {
    
  const [tasks, setTasks] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
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
  ;

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
        router.back();
    }

  return (
    <View style={styles.container}>
      <View style={styles.taskInfo}>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleAddTask}>
            <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={router.back}>
                <Text style={styles.cancelTextEdit}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:themes.colors.background,
    padding:30
  },
  taskInfo:{
    backgroundColor: themes.colors.background,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  saveText:{
    marginTop: 15,
    color: themes.colors.primary,
    fontWeight: '600',
    textAlign:'center'
  },
  cancelTextEdit: {
    marginTop:15,
    color: themes.colors.muted,
    fontWeight: '600',
    textAlign:'center'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap:20
      },
});
