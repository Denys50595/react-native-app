/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
import useDarkTheme from './src/components/hooks/useDarkTheme';

const App = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {isDarkTheme} = useDarkTheme();
  const filteredData = mockItemData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onRefresh = useCallback(() => {
    console.warn(isDarkTheme);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onLoad = (distanceFromEnd: number) => {
    if (filteredData.length < 20) {
      console.warn('onLoad', distanceFromEnd);
      const fakeItem: any = {
        id: distanceFromEnd,
        image: 'https://loremflickr.com/640/480/food',
        title: 'Dynamicaly loading',
      };
      filteredData.push(fakeItem);
    }
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:example@email.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleWebPress = () => {
    Linking.openURL('http://www.example.com');
  };

  const handleSharePress = () => {
    Share.share({
      message:
        'Перевірте ці контактні дані: example@email.com, +1234567890, www.example.com',
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: isDarkTheme ? '#000' : '#FFF'}}>
      {/* <View
        style={{
          height: '100%',
        }}>
        <Carousel data={mockCarouselData}></Carousel>
      </View> */}
      <View
        style={[
          styles.filterContainer,
          searchVisible ? styles.hasSearch : styles.noSearch,
          {backgroundColor: isDarkTheme ? '#000' : '#FFF'},
        ]}>
        <View>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text>Email: example@email.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePhonePress}>
            <Text>Phone: +1234567890</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWebPress}>
            <Text>Website: www.example.com</Text>
          </TouchableOpacity>
        </View>
        {searchVisible && (
          <TextInput
            style={styles.searchInput}
            onChangeText={text => {
              setSearchTerm(text);
            }}
            value={searchTerm}
            placeholder="Search..."
            placeholderTextColor="#000"
          />
        )}
        <View style={{flexDirection: 'row'}}>
          <CustomPressable
            onPress={handleSharePress}
            rippleColor="blue"
            style={pressableStyle.cardButton}>
            <Image
              style={{height: 20, width: 20, marginLeft: 20}}
              source={require('./assets/share-icon.png')}
            />
          </CustomPressable>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={data => onLoad(data.distanceFromEnd)}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    padding: 20,
  },
  hasSearch: {
    justifyContent: 'space-between',
  },
  noSearch: {
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    paddingBottom: 100,
    marginBottom: 100,
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
