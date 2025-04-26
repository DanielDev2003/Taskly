import React, { useState } from 'react';
import { View, Text,TouchableOpacity, FlatList } from 'react-native';
import {style} from './styles'
import {TaskModal} from '../../components/TaskModal'
import { Task } from '../../components/Task';

interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
}
export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  function handleAddTask() {
    if (title.trim() === '' || description.trim() === '') return;

    const newTask: Task = {
      id: String(new Date().getTime()),
      title,
      description,
      status: false
    };

    setTasks(prev => [...prev, newTask]);
    setTitle('');
    setDescription('');
    setModalVisible(false);
  }

  function handleToggleComplete(id: string) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  }
  return (
    <View style={style.container}>
      <View style={style.boxTop}>
            <Text style={style.title}>My Tasks</Text>
            <TouchableOpacity style={style.button} onPress={()=> setModalVisible(true)}>
              <Text style={style.buttonText}>+</Text>
            </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <Task
            title={item.title}
            description={item.description}
            status={item.status}
            onToggleComplete={()=>handleToggleComplete(item.id)}
          />
        )}
      />
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTask}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      />


    </View>
  );
}
