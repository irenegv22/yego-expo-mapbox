import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../configureStore';

const selectUserLocation = (state: RootState) => state.userLocation;

export const selectUserLocationMemoized = createSelector([selectUserLocation], userLocation => ({
  latitude: userLocation.latitude,
  longitude: userLocation.longitude,
}));
