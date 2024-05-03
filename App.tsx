/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ItemCard from './src/components/Cards/ItemCard';
import {mockCarouselData, mockItemData} from './src/services/mockData';
import CustomPressable from './src/components/CustomPressable/CustomPressable';
import {pressableStyle} from './src/components/CustomPressable/CustomPressableStyles';
import ModalComponent from './src/components/modals/ModalComponent';
import Carousel from './src/components/Carousel/Carousel';

const App = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const filteredData = mockItemData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          height: '100%',
        }}>
        <Carousel data={mockCarouselData}></Carousel>
      </View>
      {/* <View
        style={[
          styles.filterContainer,
          searchVisible ? styles.hasSearch : styles.noSearch,
        ]}>
        {searchVisible && (
          <TextInput
            style={styles.searchInput}
            onChangeText={text => setSearchTerm(text)}
            value={searchTerm}
            placeholder="Search..."
            placeholderTextColor="#000"
          />
        )}
        <View style={{flexDirection: 'row'}}>
          <CustomPressable
            onPress={() => setModalVisible(true)}
            rippleColor="blue"
            style={pressableStyle.cardButton}>
            <Image
              style={{height: 20, width: 20, marginLeft: 20}}
              source={require('./assets/heart.png')}
            />
          </CustomPressable>
          <CustomPressable
            onPress={() => setSearchVisible(!searchVisible)}
            rippleColor="blue"
            style={pressableStyle.cardButton}>
            <Image
              style={{height: 20, width: 20, marginLeft: 20}}
              source={require('./assets/search.png')}
            />
          </CustomPressable>
        </View>
      </View>
      <ModalComponent
        visible={modalVisible}
        setVisible={setModalVisible}></ModalComponent>
      <FlatList
        data={filteredData}
        renderItem={({item}) => <ItemCard item={item} />}
        keyExtractor={item => item.id}
        style={styles.scrollContainer}
        ListEmptyComponent={<Text>No items to display</Text>}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 20,
  },
  hasSearch: {
    justifyContent: 'space-between',
  },
  noSearch: {
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    height: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
