import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import LongNewsCard from 'components/card/LongNewsCard';
import colors from 'assets/colors';
import {fontSize} from 'assets/typography';

const LongNewsCardList = ({data}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Live', 'Breaking', 'Media Coverage', 'Headlines'];

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  const filteredData =
    selectedCategory === 'All'
      ? data
      : data.filter(item => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.pillsContainer}
        showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.pill,
              selectedCategory === category && styles.selectedPill,
            ]}
            onPress={() => handleCategoryPress(category)}>
            <Text style={styles.pillText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredData.map(item => (
          <LongNewsCard
            key={item?.title}
            image={item.image}
            title={item.title}
            description={item.description}
            date={item.date}
            location={item.location}
            onReadMore={item.onReadMore}
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
  pillsContainer: {
    gap: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 15,
    backgroundColor: colors.backgroundGrayDark,
  },
  selectedPill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    lineHeight:25,
    color: colors.textDark,
    ...fontSize.text14,
  },
  scrollContainer: {
    flexGrow: 1,
    gap: 20,
    paddingBottom: 20,
    paddingTop: 10,
    padding: 10,
  },
});

export default LongNewsCardList;
