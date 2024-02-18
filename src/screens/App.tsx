import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, Button, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Color from '../../static/types/colors';
import {Vehicle, VehicleStatus} from '@/types/vehicles';
import {Paths, get} from 'src/services/https';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserLocationMemoized} from 'src/redux/selectors/userLocation';
import {calculateDistance} from 'src/utils/distance.util';
import {setVehicles} from 'src/redux/reducers/vehicles';
import {setUserLocation} from 'src/redux/reducers/userLocation';
import {systemErrorAlert} from 'src/alerts/systemErrorAlert';
import {locationPermissionAlert} from 'src/alerts/locationPermissionAlert';
import {locationService} from 'src/services/locationService';

const App: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userLocation = useSelector(selectUserLocationMemoized);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleUserLocation();
  }, []);

  const navigateToMapScreen = async () => {
    await getVehicles();
    navigation.navigate('MapScreen' as never);
  };

  const getVehicles = async () => {
    try {
      setIsLoading(true);
      const vehicles: Vehicle[] = await get(Paths.TechnicalTest);
      if (vehicles as Vehicle[]) {
        const sortVehicles = addDistanceToVehicles(vehicles);
        dispatch(setVehicles(sortVehicles));
      } else {
        return systemErrorAlert();
      }
    } catch (e) {
      return systemErrorAlert();
    } finally {
      setIsLoading(false);
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

  const handleUserLocation = async () => {
    try {
      setIsLoading(true);
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
      return true;
    } catch (e) {
      systemErrorAlert();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator style={{position: 'relative'}} size="large" color={Color.GREEN} />
          </View>
        )}
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>YEGO - Technical Test</Text>
            <Button title="Go to Map Screen" onPress={navigateToMapScreen} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Color.BLACK,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: 'rgba(146, 139, 139, 0.5)',
  },
});

export default App;
