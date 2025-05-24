import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { style } from "./styles";
interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}

export function TaskModal({
  visible,
  onClose,
  onSave,
  onDelete,
  isEditing = false,
  title,
  description,
  setTitle,
  setDescription,
}: TaskModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>
            {isEditing ? "Edit Task" : "New Task"}
          </Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={style.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={style.input}
          />

          <View style={style.modalButtons}>
            {isEditing ? (
                <TouchableOpacity onPress={onDelete} style={style.deleteButton}>
                    <Text style={style.deleteText}>Delete</Text>
                </TouchableOpacity>
            ):null}
            <TouchableOpacity onPress={onClose} style={style.cancelButton}>
              <Text style={isEditing ? style.cancelTextEdit:style.cancelTextCreate}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSave}>
              <Text style={style.saveText}>Save</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  );
}
