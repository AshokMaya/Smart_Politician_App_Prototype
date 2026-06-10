import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Header from 'components/header/Header';
import {useIntl} from 'react-intl';
import VideoNewsCard from 'components/card/VideoNewsCard';

const VideosScreen = () => {
  const navigation = useNavigation();
  const intl = useIntl();

  const onClickBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };
  const title = 'Videos';
  return (
    <View style={styles.container}>
      <Header
        onClickBack={onClickBack}
        title={intl.formatMessage({defaultMessage: title})}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {videoScreenData?.map(item => (
          <VideoNewsCard
            key={item.id}
            title={item.title}
            image={item.image}
            link={item.link}
          />
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
    backgroundColor: 'red',
    borderBottomColor: '#ddd',
  },
  backButton: {
    paddingRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FAFF',
  },
  scrollContainer: {
    gap: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
});

const videoScreenData = [
  {
    id: '1',
    title:
      'ஏன் Late என்று மாணவியிடம் செல்லமாக கேட்ட அமைச்சர் உதயநிதி ஸ்டாலின் | Udhayanidhi Stalin | Inspection',
    link: '',
    image:
      'https://i.ibb.co/PG1w2THF/9868-16-2-2023-11-7-6-1-UDHAYANIDHI1-1.png',
  },
  {
    id: '2',
    title:
      'நாளை காஞ்சிக்கு வருகை தரும் "அமைச்சர் உதயநிதி" ஸ்டாலின்; தீயாய் நடக்கும் முன்னேற்பாடு பணிகள்..!',
    link: '',
    image: 'https://i.ibb.co/60hnrPmw/39-39-97695508-1.png',
  },
  {
    id: '3',
    title: 'என்ன துறை அமைச்சரானார் தெரியுமா உதயநிதி ஸ்டாலின்?',
    link: '',
    image: 'https://i.ibb.co/g5z8sng/udhayanithi-1-16709928063x2-1.png',
  },
];

export default VideosScreen;
