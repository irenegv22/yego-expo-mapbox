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
    marginHorizontal: 20,
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moreInfoContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  locationText: {
    paddingLeft: 15,
  },
  leftContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    height: '100%',
  },
  arrowIcon: {
    fontSize: 40,
    fontWeight: '100',
  },
  arrowIconEnable:{
    color: Color.GREY,
  },
  arrowIconDisable:{
    color: Color.GREY_DISABLED,
  }
});

export default styles;
