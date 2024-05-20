import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Text} from 'react-native';
import {mockItemData} from '../services/mockData';

const ItemDetails = () => {
  const route = useRoute();
  const {id}: any = route.params;
  const getItemById = (id: string) => {
    return mockItemData.find(item => item.id === id);
  };
  const result = getItemById(id);

  return (
    <>
      <Text>{result?.title}</Text>
      <Image
        style={{width: '50%', height: '20%'}}
        source={{
          uri: result?.image,
        }}
      />
      <Text>{result?.description}</Text>
    </>
  );
};

export default ItemDetails;
