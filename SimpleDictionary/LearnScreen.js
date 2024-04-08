import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {parseToWords} from './parsers/jsonParser'
import testData from './parsers/test_export.json'
import { Word } from './models/wordEntity';
import DeckSwiper from 'react-native-deck-swiper';
import RangeSlider from 'rn-range-slider';
import {sliderStyles, Rail, Thumb, RailSelected} from './common/rangePicker'

// Add your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  flashcard: {
    flex: 1,
    marginBottom: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // for Android shadow
    shadowColor: "black", // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});

const LearnScreen = () => {
  const [wordsToLearn, setWordsToLearn] = useState(undefined);
  const [cards, setCards] = useState(undefined);
  const [selectedCount, setSelectedCount] = useState(10);
  const [cardIndex, setCardIndex] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const [minWord, setMinWord] = useState(1);
  const [maxWord, setMaxWord] = useState(100);

  useEffect(() => {
    fetchWordsToLearn();
  }, []);

  const fetchWordsToLearn = async () => {
    try {
      // const response = await axios.get(`url/words?count=${selectedCount}`);

      console.log('Loading words');
      const words = await parseToWords(testData);
      setWordsToLearn(words);
      setMaxWord(words.length);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleStartLearning = () => {
    setCards(wordsToLearn.slice(minWord - 1, maxWord));
    setShowTranslation(false);
  };

  const handleCloseDeck = () => {
    setCards(null);
    setCardIndex(null);
    setShowTranslation(false);
  }

  const handleSwipe = (isDirectionRight) => {
    console.log('Handle swipe to ' + (isDirectionRight ? 'right' : 'left'));
    setShowTranslation(false);
    if (isDirectionRight) {
      // Logic for known word
    } else {
      // Logic for unknown word
    }
  };

  const handleSwipedAll = () => {
    console.log('all swiped');
    setCards(null);
    setCardIndex(null);
  };

  const handleShowCardDetails = (index) => {
    console.log("ShowCardDetails clicked for index: " + index);
    setShowTranslation(true);
    setCardIndex(index)
  };

  const renderFlashcard = (word, index) => {
    console.log("Rendering flashcard with index " + index + ", word: " + word.translations);
    return (
      <View style={styles.flashcard} key={index}>
        <Text style={styles.translationText}>{word.translations}</Text>
        {showTranslation && (
          <>
            <Text style={styles.detailText}>{word.eng}</Text>
            {word.transcription && <Text style={styles.detailText}>{word.transcription}</Text>}
            {word.examples && word.examples.map((example, index) => (
              <Text key={index} style={styles.detailText}>{example}</Text>
            ))}
            {word.pictureUrl && <Image source={{ uri: word.pictureUrl }} style={styles.image} />}
          </>
        )}
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => handleShowCardDetails(index)}>
          <Icon name="eye" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cards ? (
        <DeckSwiper
          childrenOnTop={true}
          cards={cards}
          cardIndex={cardIndex}
          renderCard={(card, index) => renderFlashcard(card, index)}
          onSwipedLeft={() => handleSwipe(false)}
          onSwipedRight={() => handleSwipe(true)}
          onSwipedAll={() => handleSwipedAll()}
          backgroundColor='transperent'
        >
          <View style={styles.buttonContainer}>
            <Button title="< Back" onPress={handleCloseDeck} />
          </View>
        </DeckSwiper>
    ) : (
      <View>
        <Button title="Start" onPress={handleStartLearning} />
        <Text style={{marginTop: 40}}>Select range of words from your dictionary to learn:</Text>
        {wordsToLearn && <View style={sliderStyles.sliderContainer}>
          <RangeSlider
            style={sliderStyles.rangeSlider}
            min={1}
            max={wordsToLearn.length}
            step={1}
            floatingLabel
            renderThumb={Thumb}
            renderRail={Rail}
            renderRailSelected={RailSelected}
            onValueChanged={(minWord, maxWord) => {
              setMinWord(minWord);
              setMaxWord(maxWord);
            }}
          />
          <Text style={sliderStyles.valueLabel}>Min word: {minWord}</Text>
          <Text style={sliderStyles.valueLabel}>Max word: {maxWord}</Text>
        </View>}
      </View>
    )}
    </View>
  );
};

export default LearnScreen;
