import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const DictionaryScreen = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get('your-backend-url/dictionary');
      setWords(response.data);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const addWord = async () => {
    // Implement logic to add a new word
  };

  return (
    <View>
      <Text>Dictionary</Text>
      {words.map((word, index) => (
        <View key={index}>
          <Text>{word.word}</Text>
          <Text>{word.translation}</Text>
          {/* Add button to play pronunciation */}
        </View>
      ))}
      <Button title="Add Word" onPress={addWord} />
    </View>
  );
};

export default DictionaryScreen;