import colors from 'assets/colors';
import React, {useState} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';

const CustomScrollView = ({
  children,
  containerStyle,
  scrollViewStyle,
  contentContainerStyle,
  ...props
}) => {
  const [indicator] = useState(new Animated.Value(0));
  const [wholeHeight, setWholeHeight] = useState(1);
  const [visibleHeight, setVisibleHeight] = useState(0);

  const indicatorSize =
    wholeHeight > visibleHeight
      ? (visibleHeight * visibleHeight) / wholeHeight
      : visibleHeight;

  const difference =
    visibleHeight > indicatorSize ? visibleHeight - indicatorSize : 0;

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        {...props}
        style={scrollViewStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        onContentSizeChange={(width, height) => {
          setWholeHeight(height);
        }}
        onLayout={({
          nativeEvent: {
            layout: {x, y, width, height},
          },
        }) => setVisibleHeight(height)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: indicator}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {children}
      </ScrollView>

      {difference > 0 ? (
        <Animated.View
          style={[
            styles.indicator,
            {
              height: indicatorSize,
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    visibleHeight / wholeHeight,
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
    position: 'relative',
  },
  indicator: {
    right: 4,
    width: 5,
    borderRadius: 22,
    position: 'absolute',
    backgroundColor: colors.tabBarBorder,
  },
});

export default CustomScrollView;
