import React from 'react';
import {Alert, Image, Pressable, Text, View} from 'react-native';
import {style} from './ItemCardStyles';
import {pressableStyle} from '../CustomPressable/CustomPressableStyles';
import CustomPressable from '../CustomPressable/CustomPressable';
import {useNavigation} from '@react-navigation/native';
import OrderStore from '../../store/OrderStore';

interface Props {
  title: string;
  isNew: boolean;
  image: string;
  id: string;
  description: string;
  price: number;
}

const ItemCard = ({
  item: {title, isNew, image, id, description, price},
}: {
  item: Props;
}) => {
  const navigation = useNavigation();
  const hangeNavDetails = () => {
    navigation.navigate('ItemDetails', {id});
  };

  return (
    <Pressable onPress={hangeNavDetails}>
      <View style={style.card}>
        <View style={style.cardContent}>
          <View style={style.logoContainer}>
            <Image
              style={style.logo}
              source={{
                uri: image,
              }}
            />
            {isNew && (
              <View style={style.newContainer}>
                <Text style={style.newContainerText}>New</Text>
              </View>
            )}
          </View>
          <View style={style.cardWrap}>
            <View style={style.cardTitleContainer}>
              <Text style={{textTransform: 'uppercase'}}>{title}</Text>
              <Image
                style={{height: 20, width: 20}}
                source={require('../../../assets/heart.png')}
              />
            </View>
            <View style={style.cardMiddleWrap}>
              <Text style={{marginRight: 20, fontWeight: 'bold'}}>
                {price}
                New price
              </Text>
              <Text style={{textDecorationLine: 'line-through'}}>
                Old price
              </Text>
            </View>
            <View style={style.cardBottomWrap}>
              <Text numberOfLines={1} style={{flex: 1}}>
                {description}
              </Text>
              <CustomPressable
                onPress={() =>
                  OrderStore.addOrder({
                    id,
                    title,
                    price,
                  })
                }
                rippleColor="blue"
                style={pressableStyle.cardButton}>
                <Text style={{marginRight: 5}}>Buy</Text>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../../assets/basket.png')}
                />
              </CustomPressable>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ItemCard;
