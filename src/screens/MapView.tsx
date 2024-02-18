import React, {useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectVehicles} from '../redux/selectors/vehicles';
import {View, StyleSheet} from 'react-native';
import {Vehicle, VehicleStatus, VehicleStatusIcons} from '@/types/vehicles';
import MapView, {Marker} from 'react-native-maps';
import BottomSheetComponent from 'src/components/BottomSheet/BottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {selectUserLocationMemoized} from 'src/redux/selectors/userLocation';
import {calculateDistance} from 'src/utils/distance.util';

const MyComponent = () => {
  const vehicles = useSelector(selectVehicles);
  const userLocation = useSelector(selectUserLocationMemoized);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%'], []);

  const handleMarkerPress = (vehicle: Vehicle, id: number) => {
    if (vehicle.status === VehicleStatus.AVAILABLE) {
      setSelectedVehicle(vehicle);
      setCurrentIndex(id);
    }
  };

  const handleVehiclesIcon = (vehicle: Vehicle) => {
    if (vehicle.id === selectedVehicle.id) {
      const selectedIcon = require('@/images/icon_scooter_green.png');
      return selectedIcon;
    }

    if (vehicle.status !== undefined && vehicle.status !== null) {
      return VehicleStatusIcons[vehicle.status];
    }
    const defaultIcon = require('@/images/icon_scooter_green.png');
    return defaultIcon;
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
            image={handleVehiclesIcon(vehicle)}
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
