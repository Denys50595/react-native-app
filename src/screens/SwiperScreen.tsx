import React from 'react';
import {View} from 'react-native';
import Carousel from '../components/Carousel/Carousel';
import {mockCarouselData} from '../services/mockData';

const Swiper = () => {
  return (
    <View
      style={{
        height: '100%',
      }}>
      <Carousel data={mockCarouselData}></Carousel>
    </View>
  );
};

export default Swiper;
