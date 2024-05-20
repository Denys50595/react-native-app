import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Button, Image, Text} from 'react-native';
import {mockItemData} from '../services/mockData';
import OrderStore from '../store/OrderStore';

const ItemDetails = () => {
  const route = useRoute();
  const {id}: any = route.params;
  const getItemById = (id: string) => {
    return mockItemData.find(item => item.id === id);
  };
  const result: any = getItemById(id);

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
      <Button title="Add to Cart" onPress={() => OrderStore.addOrder(result)} />
    </>
  );
};

export default ItemDetails;
