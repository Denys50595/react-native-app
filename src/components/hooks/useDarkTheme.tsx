import {useEffect, useState} from 'react';
import {Appearance, useColorScheme} from 'react-native';

const useDarkTheme = () => {
  const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setAppTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  return appTheme === 'dark' ? {isDarkTheme: true} : {isDarkTheme: false};
};

export default useDarkTheme;
