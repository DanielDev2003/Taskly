import React, { useState } from 'react';
import { View, Text,TouchableOpacity, FlatList } from 'react-native';
import {style} from './styles'
import { ProjectModal } from '../../components/ProjectModal';
import { Project } from '../../components/Project';
interface Project {
    id: string;
    title: string;
    taskName: string;
}

export default function Projects(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [title, setTitle] = useState('');
    const [taskName, setTaskName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    function handleAddProject() {
        if (title.trim() === '' || taskName.trim() === '') return;
    
        const newTask: Project = {
          id: String(new Date().getTime()),
          title,
          taskName,
        };
    
        setProjects(prev => [...prev, newTask]);
        setTitle('');
        setTaskName('');
        setModalVisible(false);
    }
    
    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                    <Text style={style.title}>My Projects</Text>
                    <TouchableOpacity style={style.button} onPress={()=> setModalVisible(true)}>
                    <Text style={style.buttonText}>+</Text>
                    </TouchableOpacity>
            </View>
            <FlatList
                data={projects}
                keyExtractor={item=>item.id}
                renderItem={({item})=>(
                <Project
                    title={item.title}
                    taskName={item.taskName}
                />
                )}
            />
            <ProjectModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleAddProject}
                title={title}
                taskName={taskName}
                setTitle={setTitle}
                setTaskName={setTaskName}
            />
        </View>
    )
}