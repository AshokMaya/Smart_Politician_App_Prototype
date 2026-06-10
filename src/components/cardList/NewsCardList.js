import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import NewsCard from 'components/card/NewsCard';
import colors from 'assets/colors';

const NewsCardList = ({data}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item) => (
          <NewsCard
            image={item.image}
            title={item.title}
            link={item.link}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundGray,
    },
    scrollContainer: {
        gap: 2,
        paddingBottom: 100,
        paddingTop: 10,
    },
});

export default NewsCardList;
