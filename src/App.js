import { getMessages } from 'assets/locale';
import KeyboardView from 'components/common/keyboardView/KeyboardView';
import Loader from 'components/common/loader/Loader';
import CustomStatusBar from 'components/common/statusBar/CustomStatusBar';
import { UserContext, defaultUserValues } from 'context/userContext';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Platform } from 'react-native';
import SplashScreen from 'screens/Login/SplashScreen';
import './gesture-handler.native';

const isAndroid = Platform.OS === 'android';

function App() {
  const [user, setUser] = useState(defaultUserValues);

  const [showLoader, setShowLoader] = useState(false);

  return (
    <IntlProvider
      defaultLocale="en"
      locale={user.language}
      messages={getMessages(user.language)}>
      <UserContext.Provider
        value={{
          ...user,
          setUser,
          setShowLoader,

        }}>
        {isAndroid ? (
          <CustomStatusBar />
        ) : null}
        <KeyboardView>
          <SplashScreen />
        </KeyboardView>
        {/* <Loader showLoader={showLoader} /> */}
      </UserContext.Provider>
    </IntlProvider>
  );
}

export default App;
