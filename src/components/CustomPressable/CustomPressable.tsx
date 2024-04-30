import React from 'react';
import {Pressable, Platform} from 'react-native';

const CustomPressable = ({children, onPress, rippleColor, style}: any) => {
  const androidProps =
    Platform.OS === 'android'
      ? {android_ripple: {color: rippleColor || 'rgba(0, 0, 0, 0.72)'}}
      : {};

  return (
    <Pressable onPress={onPress} style={style} {...androidProps}>
      {children}
    </Pressable>
  );
};

export default CustomPressable;
