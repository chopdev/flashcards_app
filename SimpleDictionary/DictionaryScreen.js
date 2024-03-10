import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import {parseToWords} from './parsers/jsonParser'
import testData from './parsers/test_export.json'

const styles = StyleSheet.create({
  wordContainer: {
    marginBottom: 10,
  },
  engText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  translationsText: {
    fontSize: 16,
    fontStyle: 'italic'
  },
});

const DictionaryScreen = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      //const response = await axios.get('your-backend-url/dictionary');
      //

      console.log('start reading');
      const words = await parseToWords(testData);
      setWords(words);

    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const addWord = async () => {
    // Implement logic to add a new word
  };

  return (
    <ScrollView>
      {words.map((word, index) => (
        <View style={styles.wordContainer} key={index}>
          <Text style={styles.engText}>{word.eng}</Text>
          <Text style={styles.translationsText}>{word.translations}</Text>
          {/* Add button to play pronunciation */}
      </View>
      ))}
      <Button title="Add Word" onPress={addWord} />
    </ScrollView>
  );
};

export default DictionaryScreen;