import {Alert} from 'react-native';

export const systemErrorAlert = () => {
  Alert.alert('Error del sistema', 'Ha ocurrido un error en el sistema. Vuelve a intentarlo en unos minutos', [
    {
      text: 'Aceptar',
      style: 'default',
    },
  ]);
};
