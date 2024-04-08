import { StyleSheet, View } from 'react-native';

export const Thumb = () => {
    return <View style={sliderStyles.thumb} />;
};
  
export const Rail = () => {
    return <View style={sliderStyles.rail} />;
};
  
export const RailSelected = () => {
    return <View style={sliderStyles.railSelected} />;
};

export const sliderStyles = StyleSheet.create({
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
    },
    rangeSlider: { 
        width: '100%',
        height: 80 
    }
  });