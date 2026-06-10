import Header from 'components/header/Header';
import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AwardIcon from 'assets/icons/award.svg';
import {fontSize} from 'assets/typography';
import colors from 'assets/colors';

const AwardsScreen = ({navigation}) => {
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
          defaultMessage: 'Awards',
        })}
        onClickBack={onClickBack}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.awardsContainer}>
          <AwardIcon />
          <Text style={styles.awardsText}>
            <FormattedMessage defaultMessage="AWARDS" />
          </Text>
        </View>
        <View style={styles.borderLine} />

        <View style={styles.textContainer}>
          <View style={styles.listMarker} />
          <Text style={styles.listText}>
            <FormattedMessage defaultMessage="Filmfare Awards South. Special Award [Winner] (2013) Best Male Debut. Oru Kal Oru Kannadi (2012)" />
          </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.listMarker} />
          <Text style={styles.listText}>
            <FormattedMessage defaultMessage="South Indian International Movie Awards. SIIMA - Tamil [Nominee] (2021) Best Actor in a Leading Role. Psycho (2020) " />
          </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.listMarker} />
          <Text style={styles.listText}>
            <FormattedMessage defaultMessage="Vijay Awards. Favorite Award [Nominee] (2010) Favorite Film. Aadhavan (2009)" />
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  awardsContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  awardsText: {
    marginTop: 12,
    ...fontSize.text15,
    color: colors.black,
  },
  borderLine: {
    width: '100%',
    marginTop: 22,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.black,
  },

  textContainer: {
    gap: 6,
    marginTop: 25,
    width: '100%',
    flexDirection: 'row',
  },
  listMarker: {
    width: 5,
    height: 5,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: colors.black,
  },
  listText: {
    ...fontSize.text15,
    color: colors.black,
  },
});

export default AwardsScreen;
