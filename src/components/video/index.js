import colors from 'assets/colors';
import FullScreen from 'assets/icons/fullscreen.svg';
import PauseIcon from 'assets/icons/pause.svg';
import PlayIcon from 'assets/icons/play.svg';
import ForwardRewindIcon from 'assets/icons/rewind_forward.svg';
import ReverseRewindIcon from 'assets/icons/rewind_reverse.svg';
import Speaker from 'assets/icons/speaker.svg';
import SpeakerMuted from 'assets/icons/speaker_mute.svg';
import {fontSize, fontWeight} from 'assets/typography';
import {UserContext} from 'context/userContext';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RNVideo from 'react-native-video';
import {constants} from 'utils/constants';
import SeekBar from './SeekBar';

const speedOptions = [0.5, 1, 1.5, 2, 2.5];

const initialState = {
  loading: true,
  muted: false,
  paused: true,
  playbackSpeed: 1,
  hideThumbNail: false,
  showControls: true,
  toggleFullScreen: false,
};

function interpolate(value, minInput, maxInput, minOutput, maxOutput) {
  const val =
    ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) +
    minOutput;

  if (typeof val !== 'number' || isNaN(val)) {
    return 0;
  }

  return val;
}

const formatTime = seconds => {
  if (seconds < 0) {
    return '00:00';
  }

  const hrs = Math.floor(seconds / 3600);
  const secs = Math.floor(seconds % 60);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};

const VideoPlayer = ({source, onFullScreen, thumbnail, containerStyles}) => {
  const {setStatusBarColor} = useContext(UserContext);
  const videoRef = useRef(null);
  const safeAreaInsets = useSafeAreaInsets();

  const [video, setVideo] = useState({
    duration: 0,
    currentPosition: 0,
  });

  const [duration, setDuration] = useState({
    totalDuration: 0,
    currentPosition: 0,
  });

  const [state, setState] = useState(initialState);
  const {
    paused,
    showControls,
    muted,
    toggleFullScreen,
    hideThumbNail,
    playbackSpeed,
    loading,
  } = state;
  const progressRef = useRef(0);

  const updateState = (key, value) =>
    setState(prevState => ({...prevState, [key]: value}));

  let timeoutControls;
  const hideControlsAfterDelay = () => {
    if (!progressRef.current?.isSeeking) {
      timeoutControls = setTimeout(() => {
        updateState('showControls', false);
      }, 1000);
    }
  };

  const onTogglePlay = () => {
    const newPausedState = !paused;
    updateState('paused', newPausedState);
    if (!newPausedState) {
      hideControlsAfterDelay();
    }
  };

  const onTouchStart = () => {
    updateState('showControls', true);
  };

  const onTouchStartOnOverlay = () => {
    if (!paused) {
      updateState('showControls', false);
    }
  };

  const handleOnLoad = data => {
    updateState('loading', false);
    setVideo(prevState => ({...prevState, duration: data?.duration}));
    setDuration(prevState => ({...prevState, totalDuration: data?.duration}));
  };

  const setFullScreen = () => {
    updateState('toggleFullScreen', !toggleFullScreen);
    if (toggleFullScreen) {
      Orientation.lockToPortrait();
      setStatusBarColor(colors.white);
    } else {
      setStatusBarColor('#000');
      Orientation.lockToLandscape();
    }
    if (onFullScreen) {
      onFullScreen(!toggleFullScreen);
    }
    StatusBar.setHidden(!toggleFullScreen, 'slide');
  };

  const handleOnProgress = ({currentTime}) => {
    if (progressRef.current && !progressRef.current?.isSeeking) {
      progressRef.current?.onProgress(
        interpolate(currentTime, 0, video.duration, 0, 1),
      );
    }

    setDuration(prevState => ({...prevState, currentPosition: currentTime}));
    setVideo(prevState => ({...prevState, currentPosition: currentTime}));
  };

  useEffect(() => {
    const unSubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        updateState('toggleFullScreen', false);
        Orientation.lockToPortrait();
        setStatusBarColor(colors.white);
        StatusBar.setHidden(false, 'slide');
        if (onFullScreen) {
          onFullScreen(false);
        }
        return toggleFullScreen;
      },
    );

    return () => {
      unSubscribe.remove();
      clearTimeout(timeoutControls);
    };
  }, [toggleFullScreen]);

  const seekToForward = () => {
    if (!hideThumbNail) {
      updateState('hideThumbNail', true);
    }
    const seekTo =
      video.currentPosition + 30 > video.duration
        ? video.duration
        : video.currentPosition + 30;
    videoRef.current.seek(seekTo);
    handleOnProgress({currentTime: seekTo});
  };

  const seekToBackWard = () => {
    if (!hideThumbNail) {
      updateState('hideThumbNail', true);
    }

    const seekTo = video.currentPosition < 10 ? 0 : video.currentPosition - 30;
    videoRef.current.seek(seekTo);
    handleOnProgress({currentTime: seekTo});
  };

  const handleSeek = data => {
    updateState('hideThumbNail', true);
    videoRef.current.seek(data);
    setVideo(prevState => ({...prevState, currentPosition: data}));
  };

  const toggleMute = () => {
    updateState('muted', !muted);
  };
  const setPlaybackSpeed = index => {
    updateState('playbackSpeed', speedOptions[index]);
  };
  return (
    <View
      style={[
        toggleFullScreen ? styles.fullScreenParentContainer : containerStyles,
      ]}>
      <View
        style={[
          styles.container,
          toggleFullScreen
            ? {
                ...safeAreaInsets,
                ...styles.fullScreenContainer,
              }
            : null,
        ]}>
        {thumbnail &&
        paused &&
        !hideThumbNail &&
        video.currentPosition === 0 ? (
          <Image
            alt="thumbnail"
            source={thumbnail}
            style={styles.thumbNailImage}
          />
        ) : null}
        <RNVideo
          muted={muted}
          ref={videoRef}
          paused={paused}
          source={source}
          controls={false}
          resizeMode="contain"
          onLoad={handleOnLoad}
          rate={playbackSpeed}
          onTouchStart={onTouchStart}
          progressUpdateInterval={1000}
          onProgress={handleOnProgress}
          onSeek={({currentTime}) => ({currentTime})}
          style={[
            styles.RNVideo,
            toggleFullScreen ? styles.RNVideoFullScreen : null,
          ]}
        />

        <>
          <View
            onStartShouldSetResponder={() => true}
            onResponderGrant={onTouchStartOnOverlay}
            style={[
              styles.btnContainer,
              !showControls ? styles.hideFooter : null,
            ]}>
            <>
              {loading ? (
                <ActivityIndicator color={colors.primaryColor} size="large" />
              ) : (
                <>
                  <View style={styles.middleControlContainer}>
                    <TouchableOpacity onPress={seekToBackWard}>
                      <ReverseRewindIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onTogglePlay}
                      style={styles.playBtnContainer}>
                      {paused ? (
                        <PlayIcon style={styles.playIcon} />
                      ) : (
                        <PauseIcon style={styles.playIcon} />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={seekToForward}>
                      <ForwardRewindIcon />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          </View>
          <View
            style={[
              styles.footerContainer,
              toggleFullScreen ? styles.footerContainerFullScreen : null,
              !showControls || loading ? styles.hideFooter : null,
            ]}>
            <View style={styles.seekbarContainer}>
              <Text numberOfLines={1} style={[styles.durationBaseText]}>
                {formatTime(video?.currentPosition)}
              </Text>

              <SeekBar
                ref={progressRef}
                onSeeking={handleSeek}
                duration={duration.totalDuration}
              />

              <Text numberOfLines={1} style={[styles.durationBaseText]}>
                {formatTime(video?.duration)}
              </Text>
            </View>
            <View
              style={[
                styles.footerBtnControlsContainer,
                toggleFullScreen
                  ? styles.footerBtnControlsContainerFullScreen
                  : null,
              ]}>
              {speedOptions?.map((speed, index) => (
                <TouchableOpacity
                  hitSlop={constants.hitSlop}
                  key={speed}
                  onPress={() =>
                    setPlaybackSpeed((index + 1) % speedOptions.length)
                  }
                  style={[
                    playbackSpeed !== speed ? styles.speedOption : null,
                    styles.playBackOption,
                  ]}>
                  <Text style={[styles.speedText]}>{playbackSpeed}x</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                hitSlop={constants.hitSlop}
                onPress={toggleMute}>
                {muted ? <SpeakerMuted /> : <Speaker />}
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop={constants.hitSlop}
                onPress={setFullScreen}>
                <FullScreen />
              </TouchableOpacity>
            </View>
          </View>
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fullScreenParentContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  fullScreenContainer: {
    position: 'absolute',
    backgroundColor: '#000',
  },
  RNVideo: {
    height: 220,
  },
  RNVideoFullScreen: {
    inset: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  footerContainer: {
    inset: 0,
    top: 'auto',
    zIndex: 3,
    padding: 14,
    paddingRight: 25,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: colors.videoBackground,
  },
  footerContainerFullScreen: {
    gap: 30,
    paddingTop: 20,
    paddingRight: 40,
    paddingBottom: 40,
  },
  durationBaseText: {
    flexBasis: '14%',
    ...fontSize.text10,
    ...fontWeight.w500,
    color: colors.white,
    textAlign: 'center',
  },
  playIcon: {
    width: 20,
    height: 20,
  },
  btnContainer: {
    inset: 0,
    zIndex: 3,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#10141899',
    justifyContent: 'center',
  },
  middleControlContainer: {
    gap: 28,
    alignItems: 'center',
    flexDirection: 'row',
  },
  playBtnContainer: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.white,
    backgroundColor: colors.primaryColor,
  },
  seekbarContainer: {
    gap: 6,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  speedText: {
    ...fontSize.text12,
    ...fontWeight.w700,
    color: colors.white,
    textAlign: 'right',
  },
  seekbar: {flex: 1},
  hideFooter: {
    display: 'none',
  },
  playBackOption: {
    width: 26,
  },
  thumbNailImage: {
    inset: 0,
    zIndex: 2,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  },
  speedOption: {
    display: 'none',
  },
  footerBtnControlsContainer: {flexDirection: 'row', gap: 20},
  footerBtnControlsContainerFullScreen: {gap: 35},
});

export default VideoPlayer;
