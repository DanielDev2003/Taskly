import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { style } from './styles';
import { TaskModal } from '../../components/TaskModal';
import { TaskItem } from '../../components/TaskItem';
import { Task } from '../../interfaces/Task';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function handleAddTask() {
    if (title.trim() === '' || description.trim() === '') return;

    const newTask: Task = {
      id: String(new Date().getTime()),
      title,
      description,
      status: false,
    };

    setTasks(prev => [...prev, newTask]);
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
    resetModal()
  } //edit Task

  function handleDeleteTask() {
     
    if (!selectedTask) return;
    const filtered = tasks.filter(task => task.id !== selectedTask.id);
    setTasks(filtered);
    resetModal()
  } // delete Task

  function handleToggleComplete(id: string) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
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
