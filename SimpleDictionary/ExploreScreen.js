import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
//import RangeSlider from 'react-native-range-slider-expo';
import RangeSlider from 'rn-range-slider';

const styles = StyleSheet.create({
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: 'white',
  },
  rail: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
  },
  railSelected: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  sliderContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginVertical: 20,
  },
  valueLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  }
});

const Thumb = () => {
  return <View style={styles.thumb} />;
};

const Rail = () => {
  return <View style={styles.rail} />;
};

const RailSelected = () => {
  return <View style={styles.railSelected} />;
};

const ExploreScreen = () => {
  const [sets, setSets] = useState([]);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  /*useEffect(() => {
    fetchSets();
  }, []); */

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
      <View style={styles.sliderContainer}>
        <RangeSlider
          style={{ width: '100%', height: 80 }}
          min={0}
          max={100}
          step={1}
          floatingLabel
          renderThumb={Thumb}
          renderRail={Rail}
          renderRailSelected={RailSelected}
          onValueChanged={(low, high) => {
            setLow(low);
            setHigh(high);
          }}
        />
        <Text style={styles.valueLabel}>Min Value: {low}</Text>
        <Text style={styles.valueLabel}>Max Value: {high}</Text>
      </View>
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