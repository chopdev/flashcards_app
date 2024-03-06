import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const ExploreScreen = () => {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    fetchSets();
  }, []);

  const fetchSets = async () => {
    try {
      const response = await axios.get('your-backend-url/sets');
      setSets(response.data);
    } catch (error) {
      console.error('Error fetching sets:', error);
    }
  };

  const addWordToDictionary = async (word) => {
    // Implement logic to add a word to the dictionary
  };

  return (
    <View>
      <Text>Explore</Text>
      {sets.map((set, index) => (
        <View key={index}>
          <Text>{set.name}</Text>
          <Button
            title="Add to Dictionary"
            onPress={() => addWordToDictionary(set.word)}
          />
        </View>
      ))}
    </View>
  );
};

export default ExploreScreen;