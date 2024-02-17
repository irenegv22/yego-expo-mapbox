import React from 'react';
import {StyleSheet} from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoidG9ybWVsaW5lYW4iLCJhIjoiY2xyNmNjNmcwMjhodDJzcG41cGh1cHFhMyJ9.MuxxMkhxEHHaJdRX6nxGeA');

const MapComponent: React.FC = () => (
  <Mapbox.MapView
    style={styles.map}
    compassEnabled={false}
    scaleBarEnabled={false}
    gestureSettings={{
      pitchEnabled: false,
    }}
  >
    <Mapbox.Images
      images={{
        markerBlack: require('../../static/images/icon_scooter_black.png'),
        markerGreen: require('../../static/images/icon_scooter_green.png'),
        markerOrange: require('../../static/images/icon_scooter_orange.png'),
        markerRed: require('../../static/images/icon_scooter_red.png'),
      }}
    />
  </Mapbox.MapView>
);

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
