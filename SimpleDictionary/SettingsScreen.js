import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleBackup = () => {
    // Implement backup functionality
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Account Settings</Text>
        <Button title="Edit" onPress={() => {/* Handle Edit */}} />
        <Button title="Backup" onPress={handleBackup} />
      </View>

      {/* Add more settings here */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  settingLabel: {
    fontSize: 18,
  }
});

export default SettingsScreen;
