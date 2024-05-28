import {View} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';

const CustomTabIcon = ({focused, iconName, size}: any) => {
  size = size ?? 22;

  return (
    <View style={{alignItems: 'center'}}>
      <EntypoIcons
        name={iconName}
        color={focused ? '#000000' : 'gray'}
        size={size}
      />
    </View>
  );
};

export default CustomTabIcon;
