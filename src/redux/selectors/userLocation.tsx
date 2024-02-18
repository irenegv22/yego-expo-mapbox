import {RootState} from '../configureStore';

export const selectUserLocation = (state: RootState) => ({
  latitude: state.userLocation.latitude,
  longitude: state.userLocation.longitude,
});
