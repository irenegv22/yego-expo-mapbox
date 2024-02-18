import * as Location from 'expo-location';

class LocationService {
  public subscription: Location.LocationSubscription | undefined;
  token: string | undefined;
  locationOptions: Location.LocationOptions = {
    accuracy: Location.LocationAccuracy.Highest,
    mayShowUserSettingsDialog: true,
  };

  public getPermissionsStatus = async () => {
    const [{granted: foregroundStatusPermission}] = await Promise.all([Location.getForegroundPermissionsAsync()]);

    return {
      foregroundStatusPermission,
      permission: foregroundStatusPermission,
    };
  };

  public requestPermissions = async () => {
    const {foregroundStatusPermission} = await this.getPermissionsStatus();
    let foreground = foregroundStatusPermission;
    if (!foregroundStatusPermission) {
      const {granted: foregroundPermission} = await Location.requestForegroundPermissionsAsync();
      foreground = foregroundPermission;
    }
    return foreground;
  };

  public getLocation = async () => {
    const {permission} = await this.getPermissionsStatus();
    if (!permission) return;
    const location = await Location.getCurrentPositionAsync(this.locationOptions);
    return location;
  };
}

export const locationService = new LocationService();
