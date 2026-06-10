import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

const TopTab = ({
  tabs,
  CustomTab,
  initialRouteName = '',
  params,
  screenOptions,
}) => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}
      tabBar={props => CustomTab({tabData: tabs, ...props})}>
      {tabs?.map(tab => (
        <Tab.Screen
          key={tab.path}
          name={tab.path}
          options={tab.options}
          component={tab.component}
          initialParams={{...params, ...tab?.params}}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TopTab;
