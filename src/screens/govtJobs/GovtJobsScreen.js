import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from 'assets/colors';
import {fontSize, fontWeight} from 'assets/typography';

import Header from 'components/header/Header';
import {useIntl} from 'react-intl';
import JobCard from 'components/card/Jobcard';

const GovtJobsScreen = () => {
  const navigation = useNavigation();
  const intl = useIntl();

  const onClickBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };
  const title = 'Govt Jobs';
  return (
    <View style={styles.container}>
      <Header
        onClickBack={onClickBack}
        title={intl.formatMessage({defaultMessage: title})}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {JobCardData?.map(item => (
          <JobCard key={item.id} title={item.title} />
        ))}
      </ScrollView>
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
  scrollContainer: {
    paddingHorizontal: 8,
  },
});

const JobCardData = [
  {
    id: '1',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
  },
  {
    id: '2',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
  },
  {
    id: '3',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
  },
  {
    id: '4',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
  },
  {
    id: '5',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
  },
  {
    id: '6',
    title: 'CCUHM Recruitment 2023 221 Nurse & Lab Technician Posts',
  },
];

export default GovtJobsScreen;
