import React, {forwardRef, useCallback, useState} from 'react';
import {
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
import Reanimated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const Flatlist = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animation = useSharedValue(1);
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
    // if (filteredData.length < 20) {
    //   console.warn('onLoad', distanceFromEnd);
    //   const fakeItem: any = {
    //     id: distanceFromEnd,
    //     image: 'https://loremflickr.com/640/480/food',
    //     title: 'Dynamicaly loading',
    //   };
    //   filteredData.push(fakeItem);
    // }
  };

  // const handleSharePress = () => {
  //   Share.share({
  //     message:
  //       'Перевірте ці контактні дані: example@email.com, +1234567890, www.example.com',
  //   });
  // };

  const handleInputToggle = useCallback(() => {
    setIsVisible(!isVisible);
    animation.value = isVisible
      ? withSpring(0, {damping: 12, stiffness: 120})
      : withSpring(1, {damping: 12, stiffness: 120});
  }, [isVisible]);

  const animatedInputStyle = useAnimatedStyle(() => {
    const translateX = interpolate(animation.value, [0, 1], [0, 0], 'clamp');
    const opacity = interpolate(animation.value, [0, 1], [0, 1], 'clamp');
    const scale = interpolate(
      animation.value,
      [0, 0.5, 1],
      [0.5, 1.1, 1],
      'clamp',
    );

    return {
      transform: [{translateX}, {scale}],
      opacity,
    };
  });

  const translationY = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translationY.value, [0, 100], [1, 0], 'clamp'),
    height: interpolate(translationY.value, [0, 100], [100, 0], 'clamp'),
  }));

  const HeaderComponent = forwardRef(() => (
    <Reanimated.View
      style={[
        styles.filterContainer,
        isVisible ? styles.hasSearch : styles.noSearch,
        {backgroundColor: isDarkTheme ? '#fff' : '#FFF'},
        animatedHeaderStyle,
      ]}>
      <Reanimated.View
        style={[
          {
            flex: 1,
            height: 40,
          },
          animatedInputStyle,
        ]}>
        <TextInput
          style={styles.searchInput}
          onChangeText={text => {
            setSearchTerm(text);
          }}
          value={searchTerm}
          placeholder="Search..."
          placeholderTextColor="#000"
        />
      </Reanimated.View>
      <View style={{flexDirection: 'row'}}>
        {/* <CustomPressable
            onPress={handleSharePress}
            rippleColor="blue"
            style={pressableStyle.cardButton}>
            <Image
              style={{height: 20, width: 20, marginLeft: 20}}
              source={require('../../assets/share-icon.png')}
            />
          </CustomPressable> */}
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
          onPress={handleInputToggle}
          rippleColor="blue"
          style={pressableStyle.cardButton}>
          <Image
            style={{height: 20, width: 20, marginLeft: 20}}
            source={require('../../assets/search.png')}
          />
        </CustomPressable>
      </View>
    </Reanimated.View>
  ));

  const AnimatedHeader = Reanimated.createAnimatedComponent(HeaderComponent);

  return (
    <>
      <AnimatedHeader />
      <ModalComponent
        visible={modalVisible}
        setVisible={setModalVisible}></ModalComponent>
      <Reanimated.FlatList
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
        onScroll={onScrollHandler}
      />
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  hasSearch: {
    justifyContent: 'space-between',
  },
  noSearch: {
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  searchInput: {
    backgroundColor: 'gray',
    borderRadius: 10,
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

export default Flatlist;
