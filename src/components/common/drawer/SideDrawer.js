import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

const Drawer = createDrawerNavigator();
const options = {
  headerShown: false,
};

const SideDrawer = ({
  drawerContents = [],
  CustomDrawer,
  params,
  screenOptions,
}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...options,
        ...screenOptions,
      }}
      drawerContent={CustomDrawer}>
      {drawerContents?.map(drawerContent => (
        <Drawer.Screen
          initialParams={params}
          key={drawerContent?.path}
          name={drawerContent?.path}
          options={drawerContent?.options}
          component={drawerContent?.component}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default SideDrawer;
