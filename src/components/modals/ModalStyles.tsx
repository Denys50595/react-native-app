import {StyleSheet} from 'react-native';

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalBackground: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Тінь для Android
  },
  closeButton: {
    fontWeight: 'bold',
  },
});
