import NetInfo from '@react-native-community/netinfo';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from 'assets/colors';
import Loader from 'components/common/loader/Loader';
import Toast from 'components/common/toast/Toast';
import {UserContext} from 'context/userContext';
import React, {useContext, useMemo} from 'react';
import BootSplash from 'react-native-bootsplash';
import AboutUsScreen from 'screens/AboutUsScreen';
import AwardsScreen from 'screens/AwardsScreen';
import GalleryScreen from 'screens/GalleryScreen';
import GovtJobsScreen from 'screens/govtJobs/GovtJobsScreen';
import LoginScreen from 'screens/Login/LoginScreen';
import SignupScreen from 'screens/Login/SignUpScreen';
import NewsScreen from 'screens/NewsSectionScreen/News';
import ParliamentNews from 'screens/NewsSectionScreen/ParliamentNews';
import SocialMediaScreen from 'screens/SocialMediaScreen';
import TnCMNewsScreen from 'screens/TnCmNewsScreen/TnCMNewsScreen';
import SupportScreen from 'screens/SupportScreen';
import MemberFormScreen from 'screens/Login/MemberFormScreen';
import DonationFormScreen from 'screens/DonationFormScreen';
import VideosScreen from 'screens/video/VideosScreen';
import HomeDrawer from './HomeDrawer';

const Stack = createNativeStackNavigator();

const navigatorOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: colors.white,
  },
};

const screens = [
  {
    path: 'loginScreen',
    component: LoginScreen,
  },
  {
    path: 'signUpScreen',
    component: SignupScreen,
  },
  {
    auth: false,
    path: 'homeScreen',
    component: HomeDrawer,
  },
  {
    auth: false,
    path: 'aboutUsScreen',
    component: AboutUsScreen,
  },
  {
    auth: false,
    path: 'awardsScreen',
    component: AwardsScreen,
  },
  {
    auth: false,
    path: 'socialMediaScreen',
    component: SocialMediaScreen,
  },
  {
    auth: false,
    path: 'videosScreen',
    component: VideosScreen,
  },
  {
    auth: false,
    path: 'govtJobsScreen',
    component: GovtJobsScreen,
  },
  {
    auth: false,
    path: 'tnCMNewsScreen',
    component: TnCMNewsScreen,
  },
  {
    auth: false,
    path: 'parliamentNewsScreen',
    component: ParliamentNews,
  },
  {
    auth: false,
    path: 'newsScreen',
    component: NewsScreen,
  },
  {
    auth: false,
    path: 'supportScreen',
    component: SupportScreen,
  },
  {
    auth: false,
    path: 'memberFormScreen',
    component: MemberFormScreen,
  },
  {
    auth: false,
    path: 'donationFormScreen',
    component: DonationFormScreen,
  },
  {
    auth: false,
    path: 'galleryScreen',
    component: GalleryScreen,
  },
];

function Navigation({initialScreenName}) {
  const {authToken} = useContext(UserContext);
  const navigationRef = useNavigationContainerRef();

  const authenticatedScreens = useMemo(() => {
    return screens?.map(screen => {
      const item = (
        <Stack.Screen
          key={screen.path}
          name={screen.path}
          component={screen.component}
          options={screen?.options}
        />
      );
      if (screen?.auth && authToken !== '') {
        return item;
      }

      if (!screen?.auth) {
        return item;
      }
      return item;
    });
  }, [authToken]);

  const updateNetworkScreen = () => {
    NetInfo.fetch().then(state => {
      const currentRoute = navigationRef.getCurrentRoute().name;
      if (currentRoute !== 'noNetworkScreen') {
        if (!state.isConnected) {
          navigationRef?.navigate('noNetworkScreen');
        }
      }
    });
  };

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={updateNetworkScreen}
        fallback={
          <Loader showLoader containerStyle={{backgroundColor: colors.white}} />
        }
        onReady={() => BootSplash.hide({fade: true})}>
        <Stack.Navigator
          // initialRouteName={initialScreenName || 'loginScreen'}
          initialRouteName={'homeScreen' || 'loginScreen'}
          screenOptions={{
            ...navigatorOptions,
          }}>
          {authenticatedScreens?.map(screen => screen)}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default Navigation;
