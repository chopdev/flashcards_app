import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import axios from 'axios';
import {parseToWords} from './parsers/jsonParser'
import testData from './parsers/test_export.json'
import Modal from "react-native-modal";
import { Word } from './models/wordEntity';
import * as Speech from 'expo-speech';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchWords, persistWord} from './repository/sqlLight';
import { translate } from '@vitalets/google-translate-api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  engText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  translationsText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5,
    width: '100%'
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  playBtn: {
    width: 20,
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonsContainer: {
    display: "flex",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
});

const DictionaryScreen = () => {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({
    eng: '',
    transcription: '',
    translation: '',
    examples: [],
  });
  const [proposedTranslation, setProposedTranslation] = useState('');
  const [pictureAssociation, setPictureAssociation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // TODO: take language from settings
  const language = 'uk';

  useEffect(() => {
    const loadAllWords = async () => {
      try {
        console.log('Getting words');
        //const words = await parseToWords(testData);
        const words = await fetchWords();
        setWords(words);
  
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };

    const setAudioSettings = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: false,
      });
    };

    loadAllWords();
    setAudioSettings();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (newWord.eng.trim() !== '' && newWord.eng.trim().length >= 3) {
        console.log("Translating word: " + newWord.eng); 
        translate(newWord.eng, { to: language }).then((res) => 
            setNewWord(prevState => ({ ...prevState, translation: res.text}))
        );
      }
    }, 2000);

    return () => clearTimeout(debounceTimer);
  }, [newWord.eng]);

  // Disable Save button if English word is empty
  const isSaveDisabled = !newWord.eng.trim() || !newWord.translation.trim();

  const addExample = () => {
    if (newWord.examples.length < 4) {
      setNewWord(prevState => ({
        ...prevState,
        examples: [...prevState.examples, ''],
      }));
    } else {
      // disable + button
    }
  };

  const handleExampleChange = (example, index) => {
    const updatedExamples = [...newWord.examples];
    updatedExamples[index] = example;
    setNewWord(prevState => ({
      ...prevState,
      examples: updatedExamples,
    }));
  };

  const handleModalVisible = (visible) => {
    setModalVisible(visible)
    if (!visible) {
      setNewWord(prevState => ({
        eng: '',
        transcription: '',
        translation: '',
        examples: [],
      }));
    }  
  };

  const handleAddWord = async () => {
    // Implement logic to add a new word to the dictionary
    try {
      // Make POST request to get proposed translation
      // const translationResponse = await axios.post('https://url/proposed-translation', {
      //   englishWord: newWord.eng,
      // });
      // setProposedTranslation(translationResponse.data.translation);

      // Make another POST request to get picture association
      // const pictureResponse = await axios.post('https://url/picture-association', {
      //   englishWord: newWord.eng,
      // });
      // setPictureAssociation(pictureResponse.data.pictureUrl);

      if (isSaveDisabled) {
        return;
      }

      // After fetching proposed translation and picture association, add the new word to the dictionary

      console.log("adding word: " + JSON.stringify(newWord))
      const wordEntity = new Word(newWord.eng, newWord.translation, newWord.transcription, newWord.examples);
      await persistWord(wordEntity);

      const updatedWords = [wordEntity, ...words];
      setWords(updatedWords);
      setNewWord({
        eng: '',
        translation: '',
        transcription: '',
        examples: [],
      });
      // Close the modal after adding the word
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding word:', error);
    }
  }; 

  console.log('Render DictionaryScreen. Modal visible: ' + modalVisible)
  return (
    <View style={styles.container}>
      <Button title="Add Word" onPress={() => handleModalVisible(true)} />
      {!modalVisible && <FlatList
        data={words}
        renderItem={({ item }) => <View style={styles.wordContainer}>
                                    <View>
                                      <Text style={styles.engText}>{item.eng}</Text>
                                      <Text style={styles.translationsText}>{item.translations}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.playBtn} onPress={() => Speech.speak(item.eng)}>
                                      <Icon name="play" size={18} color="#007AFF" />
                                    </TouchableOpacity>
                              </View>}
      />}
      <Modal
        isVisible={modalVisible}
        swipeDirection={['down']}
        onSwipeComplete={() => handleModalVisible(false)}
        style={styles.modal}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.buttonsContainer}>
              <Button title="Save" onPress={handleAddWord} disabled={isSaveDisabled} />
              <Button title="Cancel" onPress={() => handleModalVisible(false)} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="English word*"
              value={newWord.eng}
              onChangeText={(text) => setNewWord(prevState => ({ ...prevState, eng: text }))}
              autoCapitalize="none"
              maxLength={60}
            />
            <TextInput
              style={styles.input}
              placeholder="Translation*"
              value={newWord.translation}
              onChangeText={(text) => setNewWord(prevState => ({ ...prevState, translation: text }))}
              autoCapitalize="none"
              maxLength={120}
            />
            <TextInput
              style={styles.input}
              placeholder="Transcription (optional)"
              value={newWord.transcription}
              onChangeText={(text) => setNewWord(prevState => ({ ...prevState, transcription: text }))}
              autoCapitalize="none"
              maxLength={80}
            />
            {newWord.examples.map((example, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Example ${index + 1}`}
                value={example}
                onChangeText={(text) => handleExampleChange(text, index)}
                autoCapitalize="none"
                maxLength={500}
              />
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addExample}>
              <Text style={styles.addButtonText}>+ New example</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DictionaryScreen;