import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useWindow = () => {
  const [windowSize, setWindowSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const onChange = ({window}: any) => {
      setWindowSize({width: window.width, height: window.height});
    };

    const dimensionsHandler = Dimensions.addEventListener('change', onChange);
    return () => dimensionsHandler.remove();
  }, []);

  return {windowSize};
};

export default useWindow;
