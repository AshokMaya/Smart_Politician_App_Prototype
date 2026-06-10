import colors from 'assets/colors';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import DefaultImage from 'assets/images/placeholder.png'

const headers = {};

const CustomImage = ({
  src,
  source,
  style,
  alt,
  defaultImage,
  applyHeader = true,
  props,
  loading = false,
  loaderColor = colors.primaryColor,
  containerStyle,
}) => {
  const [hasError, setHasError] = useState(false);

  const getDefaultImageSource = useCallback(() => {
    switch (typeof defaultImage) {
      case 'string':
        return {
          uri: defaultImage,
        };
      default:
        return defaultImage
          ? defaultImage
          : DefaultImage;
    }
  }, [defaultImage]);

  const defaultImageSource = getDefaultImageSource();

  const getImageSource = useMemo(() => {
    if (hasError) {
      return defaultImageSource;
    }
    if (typeof source === 'object' && source?.uri !== '') {
      const uri = source?.uri;
      if (applyHeader) {
        return {
          uri,
          headers,
        };
      }
      return {uri};
    } else if (source?.uri === '') {
      return defaultImage;
    }

    if (typeof source === 'number') {
      return source;
    }

    return defaultImageSource;
  }, [source, defaultImage, defaultImageSource, hasError, applyHeader]);

  const handleError = errorData => {
    setHasError(true);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FastImage
        {...props}
        alt={alt}
        src={src}
        onError={handleError}
        source={getImageSource}
        style={[styles.image, style]}
        defaultSource={defaultImageSource}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={loaderColor} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
  },

  container: {position: 'relative', flex:1},

  loadingContainer: {
    inset: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomImage;
