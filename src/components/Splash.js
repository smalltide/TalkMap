import React from 'react';
import { Text, View } from 'react-native';

const Splash = ({ splashText }) => {
  return (
    <View style={styles.splashView}>
      <Text style={styles.splashText}>
        { splashText }
      </Text>
    </View>
  );
};

const styles = {
  splashView: {
    flex: 1,
    justifyContent: 'center'
  },
  splashText: {
    fontSize: 50,
    textAlign: 'center'
  }
};

export default Splash;
