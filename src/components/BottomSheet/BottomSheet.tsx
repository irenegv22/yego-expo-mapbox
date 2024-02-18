import {type FC} from 'react';
import styles from './BottomSheet.styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Vehicle} from '@/types/vehicles';
import {FontAwesome} from '@expo/vector-icons';
import Color from '@/types/colors';

interface BottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
  vehicleInfo: Vehicle;
  vehicleDistance: number;
  onLeftPress: () => void;
  onRightPress: () => void;
  currentIndex: number;
}

const BottomSheetComponent: FC<BottomSheetProps> = ({
  bottomSheetRef,
  snapPoints,
  vehicleInfo,
  vehicleDistance,
  onLeftPress,
  onRightPress,
  currentIndex,
}) => {
  const scooterImage = require('@/images/icon_scooter.png');

  const BatteryIcon = () => {
    if (vehicleInfo.battery >= 80) {
      return <FontAwesome name="battery-full" size={20} color={Color.GREEN} />;
    } else if (vehicleInfo.battery >= 60) {
      return <FontAwesome name="battery-3" size={20} color={Color.ORANGE} />;
    } else if (vehicleInfo.battery > 20) {
      return <FontAwesome name="battery-2" size={20} color={Color.ORANGE} />;
    } else return <FontAwesome name="battery-1" size={20} color={Color.RED} />;
  };

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} enableHandlePanningGesture={false}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.leftContainer} onPress={onLeftPress} disabled={currentIndex === 0 ?? false}>
          <Text style={[styles.arrowIcon, currentIndex === 0 ? styles.arrowIconDisable : styles.arrowIconEnable]}>
            〈
          </Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <View style={styles.imageContainer}>
            <Image source={scooterImage} style={styles.scooterImage} resizeMode="contain" />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{vehicleInfo.name}</Text>
            <View style={styles.moreInfoContainer}>
              <BatteryIcon />
              <Text> {vehicleInfo.battery} %</Text>
              <View style={styles.locationText}>
                <Text>📍{vehicleDistance} m</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.rightContainer}
          onPress={onRightPress}
          disabled={vehicleDistance >= 1200 ?? false}
        >
          <Text style={[styles.arrowIcon, vehicleDistance >= 1200 ? styles.arrowIconDisable : styles.arrowIconEnable]}>
            〉
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
