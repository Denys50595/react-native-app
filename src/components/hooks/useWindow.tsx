import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useWindow = () => {
  const [windowSize, setWindowSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const onChange = ({window}: any) => {
      // console.warn('on change')
      setWindowSize({width: window.width, height: window.height});
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return {windowSize};
};

export default useWindow;
