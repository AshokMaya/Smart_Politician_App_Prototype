import {useEffect, useState} from 'react';

const initialState = {x: 0, y: 0, width: 0, height: 0};

const useDimensions = ref => {
  const [dimension, setDimensions] = useState(initialState);
  useEffect(() => {
    ref?.current?.measure((x, y, width, height) => {
      setDimensions({x, y, width, height});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current]);

  return dimension;
};

export default useDimensions;
