import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DictionaryScreen from './DictionaryScreen';
import ExploreScreen from './ExploreScreen';
import LearnScreen from './LearnScreen';
import SettingsScreen from './SettingsScreen';
import SettingsButton from './SettingsButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dictionary" component={DictionaryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Simple Dictionary" 
          component={BottomTabs} 
          options={({ navigation }) => ({
            headerRight: () => <SettingsButton navigation={navigation} />
          })} 
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
