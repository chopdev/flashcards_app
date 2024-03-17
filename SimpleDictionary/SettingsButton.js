import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Icon name="gear" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SettingsButton;