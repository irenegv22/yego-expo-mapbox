import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppScreen from '@/screens/App';
import MapScreen from '@/screens/MapView';
import {Provider} from 'react-redux';
import store from 'src/redux/configureStore';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="App" component={AppScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
