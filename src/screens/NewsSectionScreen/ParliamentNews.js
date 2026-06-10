import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from 'assets/colors';
import {fontSize, fontWeight} from 'assets/typography';
import {useIntl} from 'react-intl';
import LongNewsCardList from 'components/cardList/LongNewsCardList';
import Header from 'components/header/Header';

const VideosScreen = () => {
  const navigation = useNavigation();
  const intl = useIntl();

  const onClickBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <Header
        onClickBack={onClickBack}
        title={intl.formatMessage({
          defaultMessage: 'Parliament News',
        })}
      />
      <LongNewsCardList data={NewsCardData} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    backgroundColor: colors.primaryColor,
    borderBottomColor: colors.borderGray,
  },
  backButton: {
    paddingRight: 12,
  },
  backButtonText: {
    color: colors.black,
    ...fontSize.text14,
  },
  headerTitle: {
    color: colors.black,
    ...fontSize.text16,
    ...fontWeight.w600,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const NewsCardData = [
  {
    id: '1',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
    category: 'Headlines',
  },
  {
    id: '2',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
    category: 'Breaking',
  },
  {
    id: '3',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
    category: 'Breaking',
  },
  {
    id: '4',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
    category: 'Live',
  },
  {
    id: '5',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
    category: 'Media Coverage',
  },
  {
    id: '6',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
    category: 'Headlines',
  },
];

export default VideosScreen;
