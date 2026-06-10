import colors from 'assets/colors';
import {fontSize} from 'assets/typography';
import CustomImage from 'components/common/image/CustomImage';
import Header from 'components/header/Header';
import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const socialApps = [
  {name: 'FACEBOOK', icon: require('assets/icons/social/facebook.png')},
  {name: 'INSTAGRAM', icon: require('assets/icons/social/instagram.png')},
  {name: 'WHATSAPP', icon: require('assets/icons/social/whatsapp.png')},
  {name: 'TWITTER', icon: require('assets/icons/social/twitter.png')},
  {name: 'YOUTUBE', icon: require( 'assets/icons/social/youtube.png')},
];

const SocialMediaScreen = ({navigation}) => {
  const intl = useIntl();

  const onClickBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  return (
    <>
      <Header
        title={intl.formatMessage({
          defaultMessage: 'Social Media',
        })}
        onClickBack={onClickBack}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headText}>
          <FormattedMessage defaultMessage="Social Media" />
        </Text>

        <CustomImage
          style={styles.bannerImage}
          source={require('assets/images/udhayanithi.webp')}
        />

        <View style={styles.iconContainer}>
          {socialApps?.map((item, index) => (
            <View key={index} style={styles.item}>
              <CustomImage source={item.icon} style={styles.icon} />
              <Text style={styles.label}>{item.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bannerImage: {
    width: 152,
    height: 152,
    marginTop: 32,
    borderRadius: 300,
  },
  headText: {
    marginTop: 35,
    ...fontSize.text20,
  },
  listContainer: {
    gap: 30,
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listText: {
    flex: 1,
    ...fontSize.text16,
    color: colors.black,
  },
  icon: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    width: 30,
    height: 30,
  },

  item: {
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {marginTop: 25, gap:40},
});

export default SocialMediaScreen;
