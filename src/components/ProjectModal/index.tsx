import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { style } from "./styles";
interface ProjectModalProps{
    visible:boolean;
    onClose: () => void;
    onSave: () => void;
    title: string;
    taskName: string;
    setTitle: (value: string) => void;
    setTaskName: (value: string) => void;
}

export function ProjectModal({
    visible,
    onClose,
    onSave,
    title,
    taskName,
    setTitle,
    setTaskName
}:ProjectModalProps){
    return(
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <View style={style.modalContainer}>
                <View style={style.modalContent}>
                <Text style={style.modalTitle}>New Project</Text>

                <TextInput
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    style={style.input}
                />
                <TextInput
                    placeholder="Task Name"
                    value={taskName}
                    onChangeText={setTaskName}
                    style={style.input}
                />

                <View style={style.modalButtons}>
                    <TouchableOpacity onPress={onClose} style={style.cancelButton}>
                        <Text style={style.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onSave}>
                        <Text style={style.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </Modal>
    )
}