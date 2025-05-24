import { themes } from '@/constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { Project } from '../../../interfaces/Project';
export default function ProjectAdd() {
    
  const [tasks, setTasks] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
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
  ;

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
        router.back();
    }

  return (
    <View style={styles.container}>
      <View style={styles.taskInfo}>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Task name"
          value={taskName}
          onChangeText={setTaskName}
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
