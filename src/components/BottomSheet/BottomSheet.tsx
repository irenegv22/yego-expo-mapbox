import {type FC} from 'react';
import styles from './BottomSheet.styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, Text, Image} from 'react-native';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Vehicle} from '@/types/vehicles';

interface BottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
  vehicleInfo: Vehicle;
  vehicleDistance: number;
}

const BottomSheetComponent: FC<BottomSheetProps> = ({bottomSheetRef, snapPoints, vehicleInfo, vehicleDistance}) => {
  const scooterImage = require('@/images/icon_scooter.png');
  const batteryImage = require('@/images/icon_battery.png');

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} enableHandlePanningGesture={false}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image source={scooterImage} style={styles.scooterImage} resizeMode="contain" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{vehicleInfo.name}</Text>
          <View style={styles.moreInfoContainer}>
            <Image source={batteryImage} style={styles.batteryImage} resizeMode="contain" />
            <Text> {vehicleInfo.battery} %</Text>
            <View style={styles.locationText}>
              <Text>📍{vehicleDistance} m</Text>
            </View>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
