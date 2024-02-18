import {type FC} from 'react';
import styles from './BottomSheet.styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, Text} from 'react-native';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

interface BottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
}

const BottomSheetComponent: FC<BottomSheetProps> = ({bottomSheetRef, snapPoints}) => {
  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} enableHandlePanningGesture={false}>
      <View style={styles.mainContainer}>
        <Text>Moto Info</Text>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
