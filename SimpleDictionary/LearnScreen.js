import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import testData from './parsers/test_export.json'
import { Word } from './models/wordEntity';

// Add your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashcard: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  translationText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
  eyeButton: {
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
});

const LearnScreen = () => {
  const [wordsToLearn, setWordsToLearn] = useState(undefined);
  const [selectedCount, setSelectedCount] = useState(10);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchWordsToLearn();
  }, []);

  const fetchWordsToLearn = async () => {
    try {
      // const response = await axios.get(`url/words?count=${selectedCount}`);

      console.log('Loading words');
      //const wordEntity = new Word(newWord.eng, newWord.translation, newWord.transcription, newWord.examples);
      setWordsToLearn([
        { eng: 'Hello', translation: 'Hola', transcription: 'həˈləʊ', examples: ['Hello, how are you?'], pictureUrl: 'example-url' },
      ]);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleStartLearning = () => {
    setCurrentWordIndex(0);
    setShowDetails(false);
  };

  const handleSwipe = (direction) => {
    setShowDetails(false);
    if (direction === 'right') {
      // Logic for known word
    } else {
      // Logic for unknown word
    }
    if (currentWordIndex < wordsToLearn.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const renderFlashcard = () => {
    console.log("Rendering flashcard");
    console.log(wordsToLearn);
    const word = wordsToLearn[currentWordIndex];
    return (
      <View style={styles.flashcard}>
        <Text style={styles.translationText}>{word.translation}</Text>
        {showDetails && (
          <>
            <Text style={styles.detailText}>{word.eng}</Text>
            {word.transcription && <Text style={styles.detailText}>{word.transcription}</Text>}
            {word.examples.map((example, index) => (
              <Text key={index} style={styles.detailText}>{example}</Text>
            ))}
            {word.pictureUrl && <Image source={{ uri: word.pictureUrl }} style={styles.image} />}
          </>
        )}
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowDetails(true)}>
          <Icon name="eye" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Start" onPress={handleStartLearning} />
      {wordsToLearn && <Swipeable
        onSwipeableRightOpen={() => handleSwipe('right')}
        onSwipeableLeftOpen={() => handleSwipe('left')}>
        {renderFlashcard()}
      </Swipeable>}
    </View>
  );
};

export default LearnScreen;
