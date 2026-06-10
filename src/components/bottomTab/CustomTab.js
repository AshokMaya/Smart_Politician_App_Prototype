import colors from 'assets/colors';
import {fontSize, fontWeight} from 'assets/typography';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {constants} from 'utils/constants';

const CustomTab = ({
  state,
  descriptors,
  navigation,
  tabData = [],
}) => {

  return (
    <View style={[styles.container]}>
      <View style={styles.redBar} />
      <View style={[styles.iconContainer]}>
        {state?.routes?.map((route, index) => {
          const {options} = descriptors[route?.key];

          const {
            hideIcon,
            Icon,
            label = '',
          } = tabData?.find(item => item.path === route.name);

          if (hideIcon) {
            return;
          }

          const isFocused = state?.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route?.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route?.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route?.key,
            });
          };

          return (
            <TouchableOpacity
              hitSlop={constants.hitSlop}
              key={route?.name}
              accessibilityRole="button"
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}>
              <View style={styles.iconItem}>
                <Icon width={20} height={20} />
                <Text style={[styles.label]}>{label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.footerText}>
        <FormattedMessage defaultMessage="Powered By: www.mmi.co.in +91 99408 25333" />
      </Text>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    bottom: 0,
    paddingBottom: 8,
    backgroundColor: colors.black,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  tabItem: {flex: 1, alignItems: 'center'},
  label: {
    marginTop: 6,
    color: colors.white,
    ...fontSize.text12,
  },
  iconItem: {
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    ...fontSize.text14,
    color: colors.white,
    ...fontWeight.w800,
  },
  redBar: {height: 32, backgroundColor:colors.primaryColor}
});
