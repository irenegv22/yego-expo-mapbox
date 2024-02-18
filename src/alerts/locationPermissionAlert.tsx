import {Alert} from 'react-native';

export const locationPermissionAlert = () => {
  Alert.alert('Error', 'No tienes permisos de localización en la applicación, por favor activalos');
};
