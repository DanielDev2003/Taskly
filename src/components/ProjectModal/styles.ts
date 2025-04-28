import {StyleSheet } from "react-native";

export const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        width: '85%',
        borderRadius: 12,
      },
      modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      input: {
        backgroundColor: '#F3F4F6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
      },
      cancelButton: {
        marginRight: 15,
      },
      cancelText: {
        color: '#EF4444',
        fontWeight: '600',
      },
      saveText: {
        color: '#2563EB',
        fontWeight: '600',
      },
})