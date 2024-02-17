import React from 'react';
import {useSelector} from 'react-redux';
import {selectVehicles} from '../redux/selectors/vehicles';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {setVehicles} from 'src/redux/reducers/vehicles';
import {Vehicle, VehicleStatus} from '@/types/vehicles';
import MapComponent from 'src/components/Map';

const MyComponent = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);
  console.log(vehicles);

  const handleAddVehicle = () => {
    const newVehicle: Vehicle = {
      id: 123,
      name: 'New Vehicle',
      lat: 1,
      lng: 2,
      battery: 80,
      status: VehicleStatus.AVAILABLE,
    };
    const updatedVehicles = [...vehicles, newVehicle];
    dispatch(setVehicles(updatedVehicles));
  };

  return (
    <View>
      <Text>Mi Vehiculo</Text>
      <Button title="SetVehicle" onPress={handleAddVehicle} />
      <MapComponent />
    </View>
  );
};

export default MyComponent;
