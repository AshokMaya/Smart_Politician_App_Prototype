
import React from 'react';
import CustomTab from 'components/bottomTab/CustomTab';
import BottomTab from 'components/common/tab/BottomTab';
import HomeTab from 'screens/Tabs/HomeTab';
import CalendarIcon from 'assets/icons/calendar_filled.svg';
import ShareIcon from 'assets/icons/share_filled.svg';
import HomeIcon from 'assets/icons/home_filled.svg';
import NewsIcon from 'assets/icons/news_filled.svg';
import Heart from 'assets/icons/heart.svg';
export const bottomTabs = [
  {
    label: 'Home',
    auth: false,
    path: 'homeTab',
    component: HomeTab,
    Icon: HomeIcon,
  },
  {
    label: 'News',
    auth: false,
    path: 'newsTab',
    component: HomeTab,
    Icon: NewsIcon,
  },
  {
    label: 'Social Media',
    auth: false,
    path: 'socialMediaTab',
    component: HomeTab,
    Icon: ShareIcon,
  },
  {
    label: 'Schedules',
    auth: false,
    path: 'scheduleTab',
    component: HomeTab,
    Icon: CalendarIcon,
  }
];

const BottomNavigation = ({route, navigation}, props) => {


  return (
    <>
      <BottomTab
        tabs={bottomTabs}
        CustomTab={CustomTab}
        initialRouteName="homeTab"
        {...route}
        key={props?.key}
      />
    </>
  );
};


export default BottomNavigation;
