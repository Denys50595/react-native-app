import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';

const ModalScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Modal Content</Text>
      <Button title="Close Modal" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ModalScreen;
