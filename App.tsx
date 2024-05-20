/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Flatlist from './src/screens/FlatlistScreen';
import Swiper from './src/screens/SwiperScreen';
import Contacts from './src/screens/ContactsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import CustomTabIcon from './src/components/CustomTabIcon/CustomTabIcon';
import ModalScreen from './src/screens/ModalScreen';

const Stack = createNativeStackNavigator();
const Tab: any = createBottomTabNavigator();

const Tab1Stack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Flatlist"
        component={Flatlist}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetailsScreen}
        options={({route}: any) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{headerShown: false, presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

const App = (): React.JSX.Element => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#000000',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="FlatList"
            component={Tab1Stack}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}: any) => (
                <CustomTabIcon focused={focused} iconName="list" />
              ),
            }}
          />
          <Tab.Screen
            name="Swiper"
            component={Swiper}
            options={{
              tabBarIcon: ({focused}: any) => (
                <CustomTabIcon focused={focused} iconName="bug" />
              ),
            }}
          />
          <Tab.Screen
            name="Contacts"
            component={Contacts}
            options={{
              tabBarIcon: ({focused}: any) => (
                <CustomTabIcon focused={focused} iconName="user" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
