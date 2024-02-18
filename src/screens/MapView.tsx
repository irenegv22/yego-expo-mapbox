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
import {selectUserLocationMemoized} from 'src/redux/selectors/userLocation';
import {calculateDistance} from 'src/utils/distance.util';

const MyComponent = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);
  const userLocation = useSelector(selectUserLocationMemoized);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%'], []);

  useEffect(() => {
    handleUserLocation();
    getVehicles();
  }, []);

  const handleMarkerPress = (vehicle: Vehicle, id: number) => {
    if (vehicle.status === VehicleStatus.AVAILABLE) {
      setSelectedVehicle(vehicle);
      setCurrentIndex(id);
    }
  };

  const getVehicles = async () => {
    try {
      const vehicles: Vehicle[] = await get(Paths.TechnicalTest);
      if (vehicles as Vehicle[]) {
        const sortVehicles = addDistanceToVehicles(vehicles);
        dispatch(setVehicles(sortVehicles));
      } else {
        return systemErrorAlert();
      }
    } catch (e) {
      return systemErrorAlert();
    }
  };

  const addDistanceToVehicles = (vehicles: Vehicle[]) => {
    const userLat = userLocation.latitude;
    const userLng = userLocation.longitude;

    const updatedVehicles = vehicles.map(vehicle => {
      if (vehicle.status === VehicleStatus.AVAILABLE) {
        const distance = calculateDistance(userLat, userLng, vehicle.lat, vehicle.lng);
        return {...vehicle, distance};
      } else {
        return vehicle;
      }
    });

    updatedVehicles.sort((a, b) => {
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      } else if (a.distance === undefined && b.distance !== undefined) {
        return 1;
      } else if (a.distance !== undefined && b.distance === undefined) {
        return -1;
      } else {
        return 0;
      }
    });
    return updatedVehicles;
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

  const handleUserVehicleDistance = (vehicle: Vehicle) => {
    return calculateDistance(userLocation.latitude, userLocation.longitude, vehicle.lat, vehicle.lng);
  };

  const handleOnLeftPress = () => {
    setSelectedVehicle(vehicles[currentIndex - 1]);
    setCurrentIndex(currentIndex - 1);
  };

  const handleOnRightPress = () => {
    setSelectedVehicle(vehicles[currentIndex + 1]);
    setCurrentIndex(currentIndex + 1);
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
        {vehicles.map((vehicle, id) => (
          <Marker
            key={vehicle.id}
            coordinate={{latitude: vehicle.lat, longitude: vehicle.lng}}
            image={handleVehiclesIcon(vehicle.status)}
            onPress={() => handleMarkerPress(vehicle, id)}
          />
        ))}
      </MapView>
      {selectedVehicle && (
        <BottomSheetComponent
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          vehicleInfo={selectedVehicle}
          vehicleDistance={handleUserVehicleDistance(selectedVehicle)}
          onLeftPress={handleOnLeftPress}
          onRightPress={handleOnRightPress}
          currentIndex={currentIndex}
        />
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
