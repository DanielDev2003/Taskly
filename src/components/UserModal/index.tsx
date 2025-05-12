import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { style } from "./styles";
interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
  name: string;
  password: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}

export function UserModal({
  visible,
  onClose,
  onSave,
  onDelete,
  isEditing = false,
  name,
  password,
  setTitle,
  setDescription,
}: UserModalProps) {
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
            {isEditing ? "Edit User" : "New User"}
          </Text>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setTitle}
            style={style.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
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
