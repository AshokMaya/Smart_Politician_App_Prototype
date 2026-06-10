import colors from 'assets/colors';
import CustomImage from 'components/common/image/CustomImage';
import Header from 'components/header/Header';
import React from 'react';
import {useIntl} from 'react-intl';
import {FlatList, StyleSheet, View} from 'react-native';

const galleryData = [
  'https://i.ibb.co/cX1wsWZt/image.png',
  'https://i.ibb.co/9msnrGpD/image.png',
  'https://i.ibb.co/bMwdcG39/image.png',
  'https://i.ibb.co/PsvYVRVj/image.png',
  'https://i.ibb.co/G3kPwMGX/image.png',
  'https://i.ibb.co/qLC0srfS/image.png',
];

const GalleryScreen = ({navigation}) => {
  const intl = useIntl();
  const onClickBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };
  return (
    <>
      <Header
        onClickBack={onClickBack}
        title={intl.formatMessage({
          defaultMessage: 'Gallery',
        })}
      />
      <>
        <FlatList
          data={galleryData}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <CustomImage
                style={styles.image}
                key={item}
                source={{uri: item}}
              />
            </View>
          )}
          numColumns={2}
          keyExtractor={item => item}
          style={styles.container}
          columnWrapperStyle={styles.grid}
        />
      </>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  grid: {
    gap: 10,
    padding: 5,
  },
  image: {
    height: 200,
  },
  imageContainer: {
    flex:1,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6,

    borderColor:  colors.black,
    // borderWidth: 1,
  },
});

export default GalleryScreen;
