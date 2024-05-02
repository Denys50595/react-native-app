import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import useWindow from '../hooks/useWindow';

const Carousel = ({data}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {windowSize} = useWindow();

  useEffect(() => {
    const handleTimeout = () => {
      scrollToNext();
    };

    if (autoScrollEnabled) {
      timeoutRef.current = setTimeout(handleTimeout, 5000);
    }
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [currentIndex, autoScrollEnabled]);

  const scrollToNext = () => {
    if (flatListRef.current && currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
    } else if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: 0});
    }
  };

  const handleLongPress = () => {
    console.warn('Long press');
    setAutoScrollEnabled(false);
  };

  const renderItem = ({item}: {item: {id: string; image: string}}) => (
    <TouchableOpacity onLongPress={handleLongPress}>
      <Image
        style={[
          styles.item,
          {
            width: windowSize.width * 0.8,
            marginHorizontal: (windowSize.width * 0.2) / 2,
          },
        ]}
        key={item.id}
        source={{
          uri: item.image,
        }}
      />
    </TouchableOpacity>
  );

  const renderIndicator = (index: number) => (
    <View
      key={index}
      style={[
        styles.indicator,
        {backgroundColor: index === currentIndex ? '#000' : 'gray'},
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onMomentumScrollEnd={event => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / windowSize.width,
          );
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.indicatorContainer}>
        {data.map((item: any, index: any) => renderIndicator(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  item: {
    height: 400,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Carousel;
