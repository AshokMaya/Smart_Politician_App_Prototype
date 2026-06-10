import colors from 'assets/colors';
import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Toast from '../toast/Toast';

const CustomModal = ({
  showModal = false,
  onRequestClose,
  children,
  containerStyle,
  transparent = true,
  ...props
}) => {
  return (
    <Modal
      animationType="fade"
      visible={showModal}
      transparent={transparent}
      onRequestClose={onRequestClose}
      {...props}>
      <View style={styles.centeredView}>
        <View style={[styles.modalContainer, containerStyle]}>{children}</View>
      </View>
      <Toast context="modal" />
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.modalBackDrop,
  },
  modalContainer: {
    width: 328,
    height: 340,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.tableBorder,
  },
});

export default CustomModal;
