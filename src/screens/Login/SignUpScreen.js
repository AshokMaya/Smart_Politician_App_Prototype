import colors from 'assets/colors';
import EmailFilledIcon from 'assets/icons/email_filled.svg';
import KeyFilledIcon from 'assets/icons/key_filled.svg';
import UserFilledIcon from 'assets/icons/user_filled.svg';
import {fontSize, fontWeight} from 'assets/typography';
import Button from 'components/common/button/Button';
import CustomImage from 'components/common/image/CustomImage';
import {Textinput} from 'components/common/input/Input';
import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const initialState = {
  userName: '',
  password: '',
  mobileOrEmail: '',
  confirmPassword: '',
};

const initialErrorState = {};

const SignUpScreen = ({navigation}) => {
  const intl = useIntl();
  const [formData, setState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialErrorState);

  const updateState = (key, val) =>
    setState(prevState => ({...prevState, [key]: val}));

  const {userName, password, mobileOrEmail, confirmPassword} = formData;

  const onSubmit = async () => {
    setErrorState(initialErrorState);
    // const errorObj = {};
    // Object.entries(formData).map(([key, val]) => {
    //   if (['email'].includes(key) && !validateEmail(val)) {
    //     errorObj[key] = true;
    //   }

    //   if (!val && !errorHandlerIgnoreKeys.includes(key)) {
    //     errorObj[key] = true;
    //   }
    // });
    // if (Object.keys(errorObj).length) {
    //   setErrorState(errorObj);
    //   return;
    // }

    try {
      navigation?.reset({
        index: 0,
        routes: [{name: 'homeScreen'}],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = () => {
    navigation?.reset({
      index: 0,
      routes: [{name: 'loginScreen'}],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <CustomImage
        style={styles.bannerImage}
        source={require('assets/images/udhayanithi.webp')}
      />
      <Text style={styles.signupText}>
        <FormattedMessage defaultMessage="Sign Up" style={styles.signupText} />
      </Text>
      <Text style={styles.signupText}>
        <FormattedMessage
          defaultMessage="Please Fill The Details And Create Account"
          style={styles.signupText}
        />
      </Text>

      <Textinput
        inputIcon={<UserFilledIcon />}
        inputStyle={[styles.inputStyle, styles?.inputStyle]}
        inputContainerStyle={styles.commonInputContainer}
        value={userName}
        isError={errorState.mobileNumberError}
        containerStyle={[styles.commonInput]}
        errorMessage={errorState.mobileNumberError}
        onChangeText={data => updateState('userName', data)}
        placeholder={intl.formatMessage({
          defaultMessage: 'User Name',
        })}
      />
      <Textinput
        maxLength={10}
        inputIcon={<EmailFilledIcon />}
        inputStyle={[styles.inputStyle, styles?.inputStyle]}
        inputContainerStyle={styles.commonInputContainer}
        value={mobileOrEmail}
        isError={errorState.mobileNumberError}
        containerStyle={[styles.commonInput]}
        errorMessage={errorState.mobileNumberError}
        onChangeText={data => updateState('mobileOrEmail', data)}
        placeholder={intl.formatMessage({
          defaultMessage: 'Email/Mobile',
        })}
      />
      <Textinput
        inputIcon={<KeyFilledIcon />}
        inputStyle={[styles.inputStyle, styles?.inputStyle]}
        inputContainerStyle={styles.commonInputContainer}
        value={password}
        isError={errorState.mobileNumberError}
        containerStyle={[styles.commonInput]}
        errorMessage={errorState.mobileNumberError}
        onChangeText={data => updateState('password', data)}
        placeholder={intl.formatMessage({
          defaultMessage: 'Password',
        })}
      />
      <Textinput
        inputIcon={<KeyFilledIcon />}
        inputStyle={[styles.inputStyle, styles?.inputStyle]}
        inputContainerStyle={styles.commonInputContainer}
        value={confirmPassword}
        isError={errorState.mobileNumberError}
        containerStyle={[styles.commonInput]}
        errorMessage={errorState.mobileNumberError}
        onChangeText={data => updateState('confirmPassword', data)}
        placeholder={intl.formatMessage({
          defaultMessage: 'Confirm Password',
        })}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          style={styles.loginBtn}
          textStyle={styles.loginBtnText}
          title={intl.formatMessage({
            defaultMessage: 'Sign up',
          })}
        />
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.line} />
        </View>
        <Button
          onPress={onLogin}
          style={[styles.loginBtn, styles.signUpBtn]}
          textStyle={styles.loginBtnText}
          title={intl.formatMessage({
            defaultMessage: 'Login',
          })}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 380,
    borderBottomRightRadius: 46,
    borderBottomLeftRadius: 46,
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
  signupText: {
    marginTop: 17,
    textAlign: 'center',
    ...fontSize.text16,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#000',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginBtn: {
    height: 38,
    width: '90%',
    marginTop: 66,
    borderRadius: 9,
  },
  loginBtnText: {
    color: colors.black,
    ...fontWeight.w700,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  signUpBtn: {
    marginTop: 25,
    marginBottom: 25,
  },
  commonInput: {
    marginTop: 22,
    paddingHorizontal: 10,
  },

  commonInputContainer: {
    borderWidth: 2,
    borderRadius: 9,
  },
});

export default SignUpScreen;
