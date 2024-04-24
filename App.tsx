/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ItemCard from './src/components/Cards/ItemCard';
import {mockItemData} from './src/services/mockData';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollContainer}>
        {mockItemData.map((item, i) => (
          <ItemCard item={item} key={i}></ItemCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
});

export default App;
