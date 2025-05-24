import { themes } from '@/constants/themes';
import { Project } from '@/interfaces/Project';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';

export default function TaskEdit() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const [task, setTask] = useState<Project | null>(null);
  const [title, setTitle] = useState('');
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    async function loadProjects() {
      const data = await AsyncStorage.getItem("@TasklyApp:projects");
      const tasks: Project[] = data ? JSON.parse(data) : [];
      const foundTask = tasks.find(t => t.id === projectId);
      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title);
        setTaskName(foundTask.taskName);
      }
    }
    loadProjects();
  }, [projectId]);

  async function handleSave() {
    if (!title.trim() || !taskName.trim()) return;

    const data = await AsyncStorage.getItem("@TasklyApp:projects");
    const tasks: Project[] = data ? JSON.parse(data) : [];

    const updatedTasks = tasks.map(t =>
      t.id === task?.id ? { ...t, title, taskName } : t
    );

    await AsyncStorage.setItem("@TasklyApp:projects", JSON.stringify(updatedTasks));
    router.back(); // volta para a tela anterior
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
          placeholder="Task Name"
          value={taskName}
          onChangeText={setTaskName}
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
