import colors from 'assets/colors';
import CustomImage from 'components/common/image/CustomImage';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeIcon from 'assets/icons/drawer/home.svg';
import NewsIcon from 'assets/icons/drawer/news.svg';
import ScheduleIcon from 'assets/icons/drawer/schedule.svg';
import SocialMediaIcon from 'assets/icons/drawer/socialMedia.svg';
import DonationIcon from 'assets/icons/drawer/donation.svg';
import MemberFormIcon from 'assets/icons/drawer/memberForm.svg';
import ContactUsIcon from 'assets/icons/drawer/contactUs.svg';
import PrivacyPolicyIcon from 'assets/icons/drawer/privacyPolicy.svg';
import HelpAndSupportIcon from 'assets/icons/drawer/helpAndSupport.svg';
import LogoutIcon from 'assets/icons/drawer/logout.svg';
import {fontSize} from 'assets/typography';
import {constants} from 'utils/constants';
import {useNavigation} from '@react-navigation/native';

const drawerData = [
  {Icon: HomeIcon, label: 'Home'},
  {Icon: NewsIcon, label: 'News'},
  {Icon: ScheduleIcon, label: 'Schedule'},
  {Icon: SocialMediaIcon, label: 'Social Media'},
  {Icon: DonationIcon, label: 'Donation Payment'},
  {Icon: MemberFormIcon, label: 'Member Form', path: 'memberFormScreen'},
  {Icon: ContactUsIcon, label: 'Contact Us'},
  {Icon: PrivacyPolicyIcon, label: 'Privacy & Policy'},
  {Icon: HelpAndSupportIcon, label: 'Help & Support'},
  {Icon: LogoutIcon, label: 'Logout'},
];

const CustomDrawer = () => {
  const navigation = useNavigation();
  const handlePress = item => {
    if (item?.path) {
      navigation?.navigate(item?.path);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomImage
        containerStyle={styles.bannerImageContainer}
        style={styles.bannerImage}
        source={require('assets/images/udhayanithi.webp')}
      />
      <View style={styles.border} />

      <View style={styles.listContainer}>
        {drawerData?.map(item => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            hitSlop={constants.hitSlop}
            style={styles.itemContainer}
            key={item.label}>
            <item.Icon />
            <Text style={styles.itemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 13,
    backgroundColor: colors.white,
  },
  bannerImageContainer: {flex: 0},
  bannerImage: {
    width: 151,
    height: 151,
    marginTop: 25,
    borderRadius: 300,
  },
  border: {
    width: '90%',
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  itemLabel: {
    color: colors.black,
    ...fontSize.text16,
  },
  listContainer: {width: '100%', marginTop: 30, gap: 20},
  itemContainer: {
    gap: 12,
    flexDirection: 'row',
  },
});

export default CustomDrawer;
