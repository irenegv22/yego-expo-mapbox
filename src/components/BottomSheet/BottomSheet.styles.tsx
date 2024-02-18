import Color from '@/types/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.WHITE,
    flexGrow: 1,
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  scooterImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moreInfoContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  batteryImage: {
    width: 20,
    height: 20,
  },
  locationText: {
    paddingLeft: 15,
  },
});

export default styles;
