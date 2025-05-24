import { themes } from '@/constants/themes';
import { User } from '@/interfaces/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';

export default function UserEdit() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [task, setTask] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function loadProjects() {
      const data = await AsyncStorage.getItem("@TasklyApp:users");
      const tasks: User[] = data ? JSON.parse(data) : [];
      const foundTask = tasks.find(t => t.id === userId);
      if (foundTask) {
        setTask(foundTask);
        setName(foundTask.name);
        setPassword(foundTask.password);
      }
    }
    loadProjects();
  }, [userId]);

  async function handleSave() {
    if (!name.trim() || !password.trim()) return;

    const data = await AsyncStorage.getItem("@TasklyApp:users");
    const tasks: User[] = data ? JSON.parse(data) : [];

    const updatedTasks = tasks.map(t =>
      t.id === task?.id ? { ...t, name, password } : t
    );

    await AsyncStorage.setItem("@TasklyApp:users", JSON.stringify(updatedTasks));
    router.back(); // volta para a tela anterior
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
