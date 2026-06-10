import {StyleSheet, View} from 'react-native';

import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {constants} from 'utils/constants';
import colors from 'assets/colors';

const parsePadding = (value, layoutWidth) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string' && value.endsWith('%')) {
    return (parseFloat(value) / 100) * layoutWidth;
  }
  return 0;
};

const Seekbar = memo(
  forwardRef(
    ({disableSeek, onSeek, onSeeking, duration, seekBarCustomStyles}, ref) => {
      const [progress, setProgress] = useState(0);
      const [isSeeking, setIsSeeking] = useState(false);

      useImperativeHandle(ref, () => ({
        onProgress: setProgress,
        isSeeking: isSeeking,
      }));

      const seekBarWidth = useRef(200);
      const seekTouchStart = useRef(0);
      const seekProgressStart = useRef(0);

      const _onSeekBarLayout = useCallback(
        ({nativeEvent}) => {
          const layoutWidth = nativeEvent.layout.width;
          const customStyle = seekBarCustomStyles;
          const paddingHorizontal = customStyle?.paddingHorizontal
            ? parsePadding(customStyle.paddingHorizontal, layoutWidth) * 2
            : 0;
          const paddingLeft = customStyle?.paddingLeft
            ? parsePadding(customStyle.paddingLeft, layoutWidth)
            : 0;
          const paddingRight = customStyle?.paddingRight
            ? parsePadding(customStyle.paddingRight, layoutWidth)
            : 0;

          const totalPadding = paddingHorizontal || paddingLeft + paddingRight;
          seekBarWidth.current = layoutWidth - totalPadding;
        },
        [seekBarCustomStyles],
      );

      const _onSeekGrant = useCallback(
        e => {
          seekTouchStart.current = e.nativeEvent.pageX;
          seekProgressStart.current = progress ?? 0;
          setIsSeeking(true);
        },
        [progress],
      );

      const _onSeekRelease = useCallback(() => {
        setIsSeeking(false);
        if (onSeek) {
          onSeek(progress * duration);
        }
      }, [duration, onSeek, progress]);

      const _onSeek = useCallback(
        e => {
          const diff = e.nativeEvent.pageX - seekTouchStart.current;
          const ratio = 100 / seekBarWidth.current;
          const newProgress = seekProgressStart.current + (ratio * diff) / 100;
          const fixedProgress = Math.min(Math.max(newProgress, 0), 1);
          if (onSeeking) {
            onSeeking(progress * duration);
          }
          setProgress(fixedProgress);
        },
        [onSeeking, duration, progress],
      );

      return (
        <View
          style={[styles.seekBar, seekBarCustomStyles, styles.seekBarFullWidth]}
          onLayout={_onSeekBarLayout}>
          <View
            style={[
              !isNaN(progress ?? 0) ? {flexGrow: progress ?? 0} : null,
              styles.seekBarProgress,
            ]}
          />
          {!disableSeek && (
            <View
              style={[
                styles.seekBarKnob,
                isSeeking && styles.seekBarKnobSeeking,
              ]}
              hitSlop={constants.hitSlop}
              onResponderMove={_onSeek}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={_onSeekGrant}
              onResponderRelease={_onSeekRelease}
              onResponderTerminate={_onSeekRelease}
            />
          )}
          <View
            style={[
              styles.seekBarBackground,
              !isNaN(progress) ? {flexGrow: 1 - progress} : null,
            ]}
          />
        </View>
      );
    },
  ),
);

export default Seekbar;

const styles = StyleSheet.create({
  seekBar: {
    flexGrow: 1,
    height: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  seekBarProgress: {
    height: 5,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: colors.primaryColor,
  },

  seekBarKnob: {
    zIndex: 1,
    width: 15,
    height: 15,
    borderWidth: 3,
    borderRadius: 14,
    marginHorizontal: -8,
    borderColor: colors.white,
    backgroundColor: colors.primaryColor,
  },
  seekBarKnobSeeking: {
    transform: [{scale: 1.2}],
  },
  seekBarBackground: {
    height: 4,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: colors.borderLine,
  },
});
