import colors from 'assets/colors';
import {fontSize, fontWeight} from 'assets/typography';
import CustomImage from 'components/common/image/CustomImage';
import Header from 'components/header/Header';
import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const AboutUsScreen = ({navigation}) => {
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
          defaultMessage: 'About Us',
        })}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <CustomImage
          style={styles.bannerImage}
          source={require('assets/images/udhayanithi.webp')}
        />
        <Text style={[styles.headTextBase]}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin" />
        </Text>
        <Text style={styles.secondaryText}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin (born 27 November 1977) is an Indian film producer, actor, and politician who prominently works in the Tamil cinema. He was appointed as Minister for Youth Welfare and Sports Development, Special act implementation Department of Tamil Nadu in the ministry led by his father the chief minister of Tamil Nadu, M. K. Stalin. He is a member of the Tamil Nadu Legislative Assembly, representing the Chepauk-Thiruvallikeni Assembly constituency." />
        </Text>
        <Text style={[styles.headTextBase, styles.headText]}>
          <FormattedMessage defaultMessage="Early life and family" />
        </Text>

        <Text style={styles.secondaryText}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin is the son of M. K. Stalin, Chief Minister of Tamil Nadu, and the grandson of former Chief Minister of Tamil Nadu M. Karunanidhi. He attended Don Bosco school and has a degree in Visual Communications from Loyola College in Chennai. Several of his relatives have been actively involved in politics, and Tamil cinema since the 1950s. His cousins Arulnithi and Dayanidhi Azhagiri are actor and producer, respectively" />
        </Text>

        <Text style={[styles.headTextBase, styles.headText]}>
          <FormattedMessage defaultMessage="Political career" />
        </Text>

        <View style={styles.bottomBorder}>
          <Text style={styles.subHeading}>
            <FormattedMessage defaultMessage="2021 Tamil Nadu Assembly Elections" />
          </Text>
        </View>

        <Text style={styles.secondaryText}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin's fierce campaign across Tamil Nadu has helped the DMK party secure a major win in the assembly elections. His AIIMS Brick remark changed the course of the Tamil Nadu election campaign." />
        </Text>

        <Text style={[styles.secondaryText]}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin contested and won in the Chepauk – Thiruvallikeni Assembly Constituency in the 2021 Tamil Nadu Legislative Assembly election." />
        </Text>

        <View style={styles.bottomBorder}>
          <Text style={styles.subHeading}>
            <FormattedMessage defaultMessage="Chepauk – Thiruvallikeni MLA" />
          </Text>
        </View>

        <Text style={styles.secondaryText}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin introduced a robotic sewer cleaner in his constituency of Chepauk-Thiruvallikeni for the first time in Tamil Nadu on 21 June 2021." />
        </Text>

        <Text style={styles.secondaryText}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin was nominated as a member of Anna University's Syndicate for a period of three years. The announcement was made by Speaker M. Appavu in the Assembly on 13 September 2021." />
        </Text>

        <View style={styles.bottomBorder}>
          <Text style={styles.subHeading}>
            <FormattedMessage defaultMessage="Chepauk – Thiruvallikeni MLA" />
          </Text>
        </View>

        <Text style={styles.secondaryText}>
          <FormattedMessage defaultMessage="Udhayanidhi Stalin sworn in as minister in Youth Welfare and Sports Development, in his father’s cabinet in Tamil Nadu on 14 December 2022." />
        </Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  bannerImage: {
    width: 151,
    height: 151,
    marginTop: 16,
    borderRadius: 300,
  },
  headTextBase: {
    marginTop: 21,
    textAlign: 'center',
    ...fontSize.text16,
    ...fontWeight.w500,
    color: colors.primaryColor,
  },
  secondaryText: {
    width: '100%',
    marginTop: 12,
    color: colors.black,
    ...fontSize.text12,
    textAlign: 'left',
    paddingHorizontal: 14,
  },
  headText: {
    width: '100%',
    marginTop: 10,
    textAlign: 'left',
    paddingHorizontal: 8,
  },
  subHeading: {
    textAlign: 'left',
    ...fontSize.text14,
    ...fontWeight.w500,
  },
  bottomBorder: {
    marginTop: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    paddingHorizontal: 14,
    borderBottomColor: colors.black,
  },
});

export default AboutUsScreen;
