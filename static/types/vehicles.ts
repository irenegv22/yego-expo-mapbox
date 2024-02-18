export enum VehicleStatus {
  AVAILABLE = 0,
  BOOKED = 1,
  ALERT_BATTERY = 2,
  ALERT_GPS = 3,
  MAINTENANCE = 4,
  DISABLED = 5,
  TOW = 6,
}

export interface Vehicle {
  id: number;
  name: string;
  lat: number;
  lng: number;
  battery: number;
  status: VehicleStatus;
  distance?: number;
}

export enum VehicleAction {
  SET_VEHICLES = 'vehicles/setVehicles',
}

export const VehicleStatusIcons = {
  [VehicleStatus.AVAILABLE]: require('@/images/icon_scooter_orange.png'),
  [VehicleStatus.BOOKED]: require('@/images/icon_scooter_black.png'),
  [VehicleStatus.ALERT_BATTERY]: require('@/images/icon_scooter_red.png'),
  [VehicleStatus.ALERT_GPS]: require('@/images/icon_scooter_red.png'),
  [VehicleStatus.MAINTENANCE]: require('@/images/icon_scooter_red.png'),
  [VehicleStatus.DISABLED]: require('@/images/icon_scooter_red.png'),
  [VehicleStatus.TOW]: require('@/images/icon_scooter_red.png'),
};
