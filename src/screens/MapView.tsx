import React, {useMemo, useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectVehicles} from '../redux/selectors/vehicles';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setVehicles} from 'src/redux/reducers/vehicles';
import {setUserLocation} from 'src/redux/reducers/userLocation';
import {Vehicle, VehicleStatus, VehicleStatusIcons} from '@/types/vehicles';
import MapView, {Marker} from 'react-native-maps';
import {Paths, get} from 'src/services/https';
import {systemErrorAlert} from 'src/alerts/systemErrorAlert';
import BottomSheetComponent from 'src/components/BottomSheet/BottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {locationService} from 'src/services/locationService';
import {locationPermissionAlert} from 'src/alerts/locationPermissionAlert';
import {selectUserLocation} from 'src/redux/selectors/userLocation';

const MyComponent = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);
  const userLocation = useSelector(selectUserLocation);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%'], []);

  useEffect(() => {
    getVehicles();
    handleUserLocation();
  }, []);

  const handleMarkerPress = (vehicle: Vehicle) => {
    if (vehicle.status === VehicleStatus.AVAILABLE) {
      setSelectedVehicle(vehicle);
    }
  };

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

  const handleVehiclesIcon = (status: VehicleStatus) => {
    if (status !== undefined && status !== null) {
      return VehicleStatusIcons[status];
    }
    const defaultIcon = require('@/images/icon_scooter_green.png');
    return defaultIcon;
  };

  const handleUserLocation = async () => {
    const permission = await locationService.requestPermissions();
    if (!permission) locationPermissionAlert();
    const location = await locationService.getLocation();
    const longitudeLocation = location?.coords.longitude;
    const latitudLocation = location?.coords.latitude;
    if (longitudeLocation && latitudLocation) {
      const actualUserLocation = {
        latitude: latitudLocation,
        longitude: longitudeLocation,
      };
      dispatch(setUserLocation(actualUserLocation));
    }
    return;
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
        showsUserLocation={true}
      >
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            coordinate={{latitude: vehicle.lat, longitude: vehicle.lng}}
            image={handleVehiclesIcon(vehicle.status)}
            onPress={() => handleMarkerPress(vehicle)}
          />
        ))}
      </MapView>
      {selectedVehicle && (
        <BottomSheetComponent bottomSheetRef={bottomSheetRef} snapPoints={snapPoints} vehicleInfo={selectedVehicle} />
      )}
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
