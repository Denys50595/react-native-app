import React from 'react';
import {Modal, View, TouchableOpacity, Text} from 'react-native';
import {modalStyles} from './ModalStyles';

const ModalComponent = ({visible, setVisible}: any) => {
  return (
    <View style={modalStyles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <View style={modalStyles.modalContainer}>
          <TouchableOpacity
            style={modalStyles.modalBackground}
            onPress={() => setVisible(false)}>
            <View style={modalStyles.modalContent}>
              <Text
                style={modalStyles.closeButton}
                onPress={() => setVisible(false)}>
                Close Modal
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
