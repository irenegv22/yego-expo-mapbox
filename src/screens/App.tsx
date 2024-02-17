import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Color from '../../static/types/colors';

const App: React.FC = () => {
  const navigation = useNavigation();

  const navigateToMapScreen = () => {
    navigation.navigate('MapScreen' as never);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>YEGO - Technical Test</Text>
            <Button title="Go to Map Screen" onPress={navigateToMapScreen} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Color.BLACK,
  },
});

export default App;
