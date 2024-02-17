import {RootState} from '../configureStore';

export const selectVehicles = (state: RootState) => state.vehicles.vehicles;
