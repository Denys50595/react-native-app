import React from 'react';
import {Image, Text, View} from 'react-native';
import {style} from './ItemCardStyles';

interface Props {
  title: string;
  isNew: boolean;
  image: string;
}

const ItemCard = ({item}: {item: Props}) => {
  return (
    <View style={style.card}>
      <View style={style.cardContent}>
        <View style={style.logoContainer}>
          <Image
            style={style.logo}
            source={{
              uri: item.image,
            }}
          />
          {item.isNew && (
            <View style={style.newContainer}>
              <Text style={style.newContainerText}>New</Text>
            </View>
          )}
        </View>
        <View style={style.cardWrap}>
          <View style={style.cardTitleContainer}>
            <Text style={{textTransform: 'uppercase'}}>{item.title}</Text>
            <Image
              style={{height: 20, width: 20}}
              source={require('../../../assets/heart.png')}
            />
          </View>
          <View style={style.cardMiddleWrap}>
            <Text style={{marginRight: 20, fontWeight: 'bold'}}>New price</Text>
            <Text style={{textDecorationLine: 'line-through'}}>Old price</Text>
          </View>
          <View style={style.cardBottomWrap}>
            <Text numberOfLines={1} style={{flex: 1}}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
              vitae voluptates eos adipisci maxime eligendi natus consequatur
              facilis earum, ullam quae distinctio delectus voluptatibus dolore
              omnis exercitationem quod, tempore quibusdam.
            </Text>
            <Text style={{marginRight: 5}}>Buy</Text>
            <Image
              style={{height: 20, width: 20}}
              source={require('../../../assets/basket.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;
