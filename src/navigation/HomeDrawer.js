import SideDrawer from 'components/common/drawer/SideDrawer';
import CustomDrawer from 'components/drawer/CustomDrawer';
import React from 'react';
import BottomNavigation from './BottomNavigation';

const drawerContents = [
  {
    path: 'bottomTab',
    component: BottomNavigation,
  },
];

const HomeDrawer = () => {
  return (
    <SideDrawer
      CustomDrawer={CustomDrawer}
      drawerContents={drawerContents}
    />
  );
};

export default HomeDrawer;
