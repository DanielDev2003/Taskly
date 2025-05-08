import React, { useState } from 'react';
import { View, Text,TouchableOpacity, FlatList } from 'react-native';
import {style} from './styles'
import { ProjectModal } from '../../components/ProjectModal';
import { ProjectItem } from '../../components/ProjectItem';
import { Project } from '../../interfaces/Project';

export default function Projects(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [title, setTitle] = useState('');
    const [taskName, setTaskName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectProject, setSelectProject] = useState<Project | null>(null);
    function handleAddProject() {
        if (title.trim() === '' || taskName.trim() === '') return;
    
        const newProject: Project = {
          id: String(new Date().getTime()),
          title,
          taskName,
        };
    
        setProjects(prev => [...prev, newProject]);
        resetModal()
    } //add a Project

    function resetModal(){
        setSelectProject(null);
        setTitle('');
        setTaskName('');
        setModalVisible(false);
    }

    function handleUpdateProject(){
        if(!selectProject) return;
        if (title.trim() === '' || taskName.trim() === '') return;
        const updateProject = projects.map(project => 
            project.id === selectProject.id
            ? {...project, title, taskName}
            : project
        )
        setProjects(updateProject)
        resetModal()
    } // update Project
    
    function handleDeleteProject(){
        if(!selectProject) return;
        const filterProjects = projects.filter(project => project.id != selectProject.id)
        setProjects(filterProjects)
        resetModal()
    }
    function handleOpenEditModal(project : Project){
        setSelectProject(project)
        setTitle(project.title)
        setTaskName(project.taskName)
        setModalVisible(true)
    } //Modal for edit Project

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
                <TouchableOpacity onPress={()=> handleOpenEditModal(item)}>
                    <ProjectItem
                        title={item.title}
                        taskName={item.taskName}
                    />
                </TouchableOpacity>
                )}
            />
            <ProjectModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={selectProject? handleUpdateProject:handleAddProject}
                onDelete={handleDeleteProject}
                isEditing={selectProject? true:false}
                title={title}
                taskName={taskName}
                setTitle={setTitle}
                setTaskName={setTaskName}
            />
        </View>
    )
}