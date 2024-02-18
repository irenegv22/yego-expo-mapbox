import React, {useMemo, useRef} from 'react';
import {useSelector} from 'react-redux';
import {selectVehicles} from '../redux/selectors/vehicles';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setVehicles} from 'src/redux/reducers/vehicles';
import {Vehicle, VehicleStatus, VehicleStatusIcons} from '@/types/vehicles';
import {useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Paths, get} from 'src/services/https';
import {systemErrorAlert} from 'src/alerts/systemErrorAlert';
import BottomSheetComponent from 'src/components/BottomSheet/BottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';

const MyComponent = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%'], []);

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

  const handleVehiclesIcon = (status: VehicleStatus) => {
    if (status !== undefined && status !== null) {
      return VehicleStatusIcons[status];
    }
    const defaultIcon = require('@/images/icon_scooter_green.png');
    return defaultIcon;
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
            image={handleVehiclesIcon(vehicle.status)}
          />
        ))}
      </MapView>
      <BottomSheetComponent bottomSheetRef={bottomSheetRef} snapPoints={snapPoints} />
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
