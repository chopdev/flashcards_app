import React from 'react';
import { View, Text, Button } from 'react-native';

const MenuScreen = () => {
  const handleBackup = () => {
    // Implement backup functionality
  };

  return (
    <View>
      <Text>Menu</Text>
      <Button title="Backup" onPress={handleBackup} />
      {/* Add settings options */}
    </View>
  );
};

export default MenuScreen;