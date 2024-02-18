import React from 'react';
import {useSelector} from 'react-redux';
import {selectVehicles} from '../redux/selectors/vehicles';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setVehicles} from 'src/redux/reducers/vehicles';
import {Vehicle, VehicleStatus} from '@/types/vehicles';
import {useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Paths, get} from 'src/services/https';
import {systemErrorAlert} from 'src/alerts/systemErrorAlert';
import markerIcon1 from '../../static/images/icon_scooter_green.png';
import markerIcon2 from '../../static/images/icon_scooter_black.png';

const MyComponent = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    try {
      const vehicles: Vehicle[] = await get(Paths.TechnicalTest);
      if (vehicles as Vehicle[]) {
        dispatch(setVehicles(vehicles));
      } else {
        return systemErrorAlert();
      }
    } catch (e) {
      return systemErrorAlert();
    }
  };

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.399522,
          longitude: 2.201317,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            coordinate={{latitude: vehicle.lat, longitude: vehicle.lng}}
            title={vehicle.name}
            image={vehicle.status === VehicleStatus.AVAILABLE ? markerIcon1 : markerIcon2}
          />
        ))}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MyComponent;
