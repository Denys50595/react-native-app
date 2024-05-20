import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomPressable from '../components/CustomPressable/CustomPressable';
import ModalComponent from '../components/modals/ModalComponent';
import {mockItemData} from '../services/mockData';
import useDarkTheme from '../components/hooks/useDarkTheme';
import ItemCard from '../components/Cards/ItemCard';
import {pressableStyle} from '../components/CustomPressable/CustomPressableStyles';
import {useNavigation} from '@react-navigation/native';

const Flatlist = () => {
  const navigation = useNavigation();
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

  const handleSharePress = () => {
    Share.share({
      message:
        'Перевірте ці контактні дані: example@email.com, +1234567890, www.example.com',
    });
  };

  return (
    <>
      <View
        style={[
          styles.filterContainer,
          searchVisible ? styles.hasSearch : styles.noSearch,
          {backgroundColor: isDarkTheme ? '#fff' : '#FFF'},
        ]}>
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
              source={require('../../assets/share-icon.png')}
            />
          </CustomPressable>
          <CustomPressable
            onPress={() => navigation.navigate('Modal')}
            rippleColor="blue"
            style={pressableStyle.cardButton}>
            <Image
              style={{height: 20, width: 20, marginLeft: 20}}
              source={require('../../assets/heart.png')}
            />
          </CustomPressable>
          <CustomPressable
            onPress={() => setSearchVisible(!searchVisible)}
            rippleColor="blue"
            style={pressableStyle.cardButton}>
            <Image
              style={{height: 20, width: 20, marginLeft: 20}}
              source={require('../../assets/search.png')}
            />
          </CustomPressable>
        </View>
      </View>
      <ModalComponent
        visible={modalVisible}
        setVisible={setModalVisible}></ModalComponent>
      <FlatList
        data={filteredData}
        renderItem={({item}) => (
          <ItemCard
            item={item}
            // onClick={navigation.navigate('ItemDetails', {id: item.id})}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.scrollContainer}
        ListEmptyComponent={<Text>No items to display</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={data => onLoad(data.distanceFromEnd)}
        onEndReachedThreshold={0.5}
      />
    </>
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

export default Flatlist;
