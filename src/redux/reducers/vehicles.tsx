import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Vehicle} from '../../../static/types/vehicles';

interface VehiclesState {
  vehicles: Vehicle[];
}

const initialState: VehiclesState = {
  vehicles: [],
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehicles(state, action: PayloadAction<Vehicle[]>) {
      state.vehicles = action.payload;
    },
  },
});

export const {setVehicles} = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
