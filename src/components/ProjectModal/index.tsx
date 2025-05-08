import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { style } from "./styles";
interface ProjectModalProps{
    visible:boolean;
    onClose: () => void;
    onSave: () => void;
    onDelete: () => void;
    isEditing?: boolean;
    title: string;
    taskName: string;
    setTitle: (value: string) => void;
    setTaskName: (value: string) => void;
}

export function ProjectModal({
    visible,
    onClose,
    onSave,
    onDelete,
    isEditing = false,
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
                <Text style={style.modalTitle}>{isEditing? "Edit Project":"New Project"}</Text>

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
                    {isEditing?(
                        <TouchableOpacity onPress={onDelete} style={style.deleteButton}>
                            <Text style={style.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    ):null}
                    <TouchableOpacity onPress={onClose} style={style.cancelButton}>
                        <Text style={isEditing?style.cancelTextEdit:style.cancelTextCreate}>Cancel</Text>
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