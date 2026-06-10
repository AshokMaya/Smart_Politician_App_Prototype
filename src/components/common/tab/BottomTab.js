import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from 'assets/colors';
import {UserContext} from 'context/userContext';
import React, {useContext, useMemo, useState} from 'react';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

const tabHeightState = {
  bottomHeight: 0,
  topHeight: 0,
};

const BottomTab = ({tabs, CustomTab, initialRouteName = '', params}) => {
  const {authToken} = useContext(UserContext);

  const authenticatedTabs = useMemo(() => {
    return tabs?.map(tab => {
      const item = (
        <Tab.Screen
          key={tab.path}
          name={tab.path}
          initialParams={params}
          component={tab.component}
          options={tab.options}
        />
      );
      if (tab?.auth && authToken !== '') {
        return item;
      }
      if (!tab?.auth) {
        return item;
      }
    });
  }, [authToken, tabs, params]);

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
      tabBar={props => CustomTab({...props, tabData: tabs})}>
      {authenticatedTabs.map(tab => tab)}
    </Tab.Navigator>
  );
};

export default BottomTab;
