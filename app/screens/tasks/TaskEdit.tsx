import { themes } from '@/constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { Task } from '../../../interfaces/Task';

export default function TaskEdit() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function loadTask() {
      const data = await AsyncStorage.getItem("@TasklyApp:tasks");
      const tasks: Task[] = data ? JSON.parse(data) : [];
      const foundTask = tasks.find(t => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title);
        setDescription(foundTask.description);
      }
    }
    loadTask();
  }, [taskId]);

  async function handleSave() {
    if (!title.trim() || !description.trim()) return;

    const data = await AsyncStorage.getItem("@TasklyApp:tasks");
    const tasks: Task[] = data ? JSON.parse(data) : [];

    const updatedTasks = tasks.map(t =>
      t.id === task?.id ? { ...t, title, description } : t
    );

    await AsyncStorage.setItem("@TasklyApp:tasks", JSON.stringify(updatedTasks));
    router.back(); // volta para a tela anterior
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskInfo}>

        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={router.back}>
            <Text style={styles.cancelTextEdit}>Cancel</Text>
        </TouchableOpacity>      
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
});
