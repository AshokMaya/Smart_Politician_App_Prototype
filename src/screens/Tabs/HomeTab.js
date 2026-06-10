import colors from 'assets/colors';
import { fontSize, fontWeight } from 'assets/typography';
import CustomImage from 'components/common/image/CustomImage';
import Header from 'components/header/Header';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';

import AboutUsIcon from 'assets/icons/homeIcons/about_us.svg';
import AchievementsIcon from 'assets/icons/homeIcons/achievements.svg';
import AwardsIcon from 'assets/icons/homeIcons/awards.svg';
import ContactUsIcon from 'assets/icons/homeIcons/contact_us.svg';
import DonationPaymentIcon from 'assets/icons/homeIcons/donation_payment.svg';
import FreedomFightersIcon from 'assets/icons/homeIcons/freedom_fighters.svg';
import GalleryIcon from 'assets/icons/homeIcons/gallery.svg';
import GovernmentJobsIcon from 'assets/icons/homeIcons/government_jobs.svg';
import GovernmentLinksIcon from 'assets/icons/homeIcons/government_links.svg';
import GrievancesIcon from 'assets/icons/homeIcons/grievances.svg';
import GrievancesExploreIcon from 'assets/icons/homeIcons/grievances_explore.svg';
import GrievancesStatusIcon from 'assets/icons/homeIcons/grievances_status.svg';
import HistoryIcon from 'assets/icons/homeIcons/history.svg';
import HomeIcon from 'assets/icons/homeIcons/home.svg';
import LiveIcon from 'assets/icons/homeIcons/live.svg';
import MyBookIcon from 'assets/icons/homeIcons/my_book.svg';
import MyTreeIcon from 'assets/icons/homeIcons/my_tree.svg';
import NewsEventIcon from 'assets/icons/homeIcons/news_event.svg';
import ParlimentNewsIcon from 'assets/icons/homeIcons/parliment_news.svg';
import PartyNewsIcon from 'assets/icons/homeIcons/party_news.svg';
import PrivateJobsIcon from 'assets/icons/homeIcons/private_jobs.svg';
import ProjectsIcon from 'assets/icons/homeIcons/projects.svg';
import SchedulesIcon from 'assets/icons/homeIcons/schedules.svg';
import SocialMediaIcon from 'assets/icons/homeIcons/social_media.svg';
import SupportIcon from 'assets/icons/homeIcons/support.svg';
import TnCmNewsIcon from 'assets/icons/homeIcons/tn_cm_news.svg';
import VideosIcon from 'assets/icons/homeIcons/videos.svg';
import Carousel from 'components/homeTab/Carousel';
import { FlatList } from 'react-native-gesture-handler';

const itemsPerView = 12;

const homeData = [
  {
    Icon: HomeIcon,
    label: 'Home',
  },
  {
    Icon: HistoryIcon,
    label: 'History',
  },
  {
    Icon: AboutUsIcon,
    label: 'About Us',
    path: 'aboutUsScreen',
  },
  {
    Icon: LiveIcon,
    label: 'Live',
  },
  {
    Icon: GalleryIcon,
    label: 'Gallery',
    path: 'galleryScreen',
  },
  {
    Icon: VideosIcon,
    label: 'Videos',
    path: 'videosScreen',
  },
  {
    Icon: ParlimentNewsIcon,
    label: 'Parliament News',
    path: 'parliamentNewsScreen',
  },
  {
    Icon: TnCmNewsIcon,
    label: 'Tn Cm News',
    path: 'tnCMNewsScreen',
  },
  {
    Icon: PartyNewsIcon,
    label: 'Party News',
    path: 'newsScreen',
  },
  {
    Icon: GrievancesIcon,
    label: 'Grievances',
  },
  {
    Icon: GrievancesStatusIcon,
    label: 'Grievances Status',
  },
  {
    Icon: GrievancesExploreIcon,
    label: 'Grievances Explore',
  },
  {
    Icon: SchedulesIcon,
    label: 'Schedules',
  },
  {
    Icon: ProjectsIcon,
    label: 'Projects',
  },
  {
    Icon: AwardsIcon,
    label: 'Awards',
    path: 'awardsScreen',
  },
  {
    Icon: GovernmentJobsIcon,
    label: 'Government Jobs',
    path: 'govtJobsScreen',
  },
  {
    Icon: PrivateJobsIcon,
    label: 'Private Jobs',
  },
  {
    Icon: GovernmentLinksIcon,
    label: 'Government Links',
  },
  {
    Icon: MyTreeIcon,
    label: 'My Tree',
  },
  {
    Icon: MyBookIcon,
    label: 'My book',
  },
  {
    Icon: AchievementsIcon,
    label: 'Achievements',
  },
  {
    Icon: SupportIcon,
    label: 'Support',
    path: 'supportScreen'
  },
  {
    Icon: FreedomFightersIcon,
    label: 'Freedom Fighters',
  },
  {
    Icon: NewsEventIcon,
    label: 'News Event',
  },
  {
    Icon: SocialMediaIcon,
    label: 'Social media',
    path: 'socialMediaScreen',
  },
  {
    Icon: DonationPaymentIcon,
    label: 'Donation Payment',
    path: 'donationFormScreen'
  },
  {
    Icon: ContactUsIcon,
    label: 'Contact Us',
  },
];

const tabData = Array(Math.ceil(homeData?.length / itemsPerView)).fill('');

const HomeTab = ({ navigation }) => {
  const onOpenDrawer = () => {
    navigation?.openDrawer();
  };

  return (
    <>
      <Header
        enableSearch
        onClickMenu={onOpenDrawer}
        iconSource={require('assets/images/udhayanithi.webp')}
      />
      <FlatList
        data={[
          <Text style={styles.headingText}>
            <FormattedMessage defaultMessage="Dravida Munnetra kazhagam" />
          </Text>,
          <CustomImage
            style={styles.bannerImage}
            source={require('assets/images/udhayanithi.webp')}
          />,
          <View style={styles.homeContainer}>
            <View style={[styles.homeInnerContainer]}>
              <Text style={[styles.homeContainerText]}>
                <FormattedMessage defaultMessage="Home" />
              </Text>
            </View>
          </View>,
          <View style={styles.tabContainer}>
            <FlatList
              pagingEnabled
              horizontal
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
              showsHorizontalScrollIndicator={false}
              data={tabData}
              renderItem={({ _, index }) => (
                <Carousel
                  homeData={homeData}
                  itemsPerView={itemsPerView}
                  index={index}
                />
              )}
            />
          </View>,
        ]}
        renderItem={({ item }) => item}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  headingText: {
    marginVertical: 9,
    textAlign: 'center',
    ...fontSize.text24,
    ...fontWeight.w800,
    color: colors.primaryColor,
  },
  bannerImage: {
    width: '100%',
    height: 294,
    borderBottomRightRadius: 46,
    borderBottomLeftRadius: 46,
  },
  homeContainer: { alignItems: 'center' },
  homeInnerContainer: {
    width: 'auto',
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 36,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: colors.black,

    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowColor: colors.black,
  },
  homeContainerText: {
    textAlign: 'center',
    color: colors.white,
    ...fontSize.text16,
  },
  tabContainer: { flexGrow: 1, marginBottom: 20 },
});

export default HomeTab;
