import React from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';

const Contacts = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:example@email.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleWebPress = () => {
    Linking.openURL('http://www.example.com');
  };

  return (
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
  );
};

export default Contacts;
