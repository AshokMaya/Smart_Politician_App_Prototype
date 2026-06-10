import colors from 'assets/colors';
import PhoneIcon from 'assets/icons/phone.svg';
import {fontSize, fontWeight} from 'assets/typography';
import Button from 'components/common/button/Button';
import CustomImage from 'components/common/image/CustomImage';
import {Textinput} from 'components/common/input/Input';
import OTPInput from 'components/login/OTPInput/OTPInput';
import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {isValidMobileNumber} from 'utils/common';

const formInitialData = {
  phoneNumber: '',
  showOTP: false,
  otp: '',
};

const errorInitialState = {
  mobileNumberError: '',
  otpError: '',
};

const otpLength = 4;
function LoginScreen({navigation}) {
  const intl = useIntl();
  const [formData, setFormData] = useState(formInitialData);
  const [errorState, setErrorState] = useState(errorInitialState);

  const updateErrorState = (key, value) => {
    setErrorState(prevState => ({...prevState, [key]: value}));
  };

  const updateState = (key, value) => {
    setFormData(prevState => ({...prevState, [key]: value}));
  };

  const onLogin = async () => {
    setErrorState(errorInitialState);
    const phoneNumber = formData?.phoneNumber || '';
    const isValidPhoneNumber = isValidMobileNumber(phoneNumber);

    if (isValidPhoneNumber) {
      updateState('showOTP', true);
    } else {
      updateErrorState(
        'mobileNumberError',
        intl?.formatMessage({
          defaultMessage: 'please enter a valid mobile number',
        }),
      );
    }
  };

  const verifyOTP = async () => {
    setErrorState(errorInitialState);
    if (otpLength === formData?.otp?.length) {
      navigation?.reset({
        index: 0,
        routes: [{name: 'signUpScreen'}],
      });
    } else {
      updateErrorState('otpError', 'please enter a valid otp');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CustomImage
        style={styles.bannerImage}
        source={require('assets/images/udhayanithi.webp')}
      />
      {formData?.showOTP ? (
        <View style={[styles.textContainer]}>
          <Text style={[styles.welcomeText, styles.otpHeader]}>
            <FormattedMessage defaultMessage="OTP Verification Code" />
          </Text>
          <Text style={[styles.otpSubHeadText]}>
            <FormattedMessage defaultMessage="Enter OTP" />
          </Text>
          <Text style={[styles.otpDescriptionText]}>
            <FormattedMessage
              defaultMessage="Please enter One Time Password(OTP) sent to your
                Mobile Number For Verification"
            />
          </Text>
          <OTPInput
            length={4}
            otpError={errorState.otpError}
            errorMessage={errorState.otpError}
            onChangeText={text => updateState('otp', text)}
            containerStyle={styles.otpInputContainer}
          />

          <Button
            onPress={verifyOTP}
            style={[styles.loginBtn, styles.veifyOtpBtn]}
            textStyle={styles.loginBtnText}
            title={intl.formatMessage({
              defaultMessage: 'Verify OTP',
            })}
          />
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={[styles.welcomeText]}>
            <FormattedMessage defaultMessage="Welcome!" />
          </Text>
          <Text style={[styles.loginDescription]}>
            <FormattedMessage defaultMessage="Login to continue" />
          </Text>
          <Textinput
            maxLength={10}
            inputMode="numeric"
            inputIcon={<PhoneIcon />}
            inputStyle={[styles.inputStyle, styles?.inputStyle]}
            inputContainerStyle={styles.phoneNumberContainerStyle}
            value={formData.phoneNumber}
            isError={errorState.mobileNumberError}
            containerStyle={styles.phoneNumberInput}
            errorMessage={errorState.mobileNumberError}
            onChangeText={data => updateState('phoneNumber', data)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Mobile number',
            })}
          />
          <Button
            onPress={onLogin}
            style={styles.loginBtn}
            textStyle={styles.loginBtnText}
            title={intl.formatMessage({
              defaultMessage: 'Login',
            })}
          />
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.line} />
          </View>
          <Button
            style={[styles.loginBtn, styles.signUpBtn]}
            textStyle={styles.loginBtnText}
            title={intl.formatMessage({
              defaultMessage: 'Sign up',
            })}
          />
        </View>
      )}
    </ScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    marginTop: 25,
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  welcomeText: {
    ...fontSize.text24,
    textAlign: 'center',
  },
  loginDescription: {
    marginTop: 16,
    ...fontSize.text20,
    textAlign: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 380,
    borderBottomRightRadius: 46,
    borderBottomLeftRadius: 46,
  },

  phoneNumberInput: {
    marginTop: 46,
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

  signUpBtn: {
    marginTop: 25,
    marginBottom: 25,
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
  otpHeader: {
    marginTop: 52,
    ...fontSize.text20,
  },
  otpSubHeadText: {
    marginTop: 20,
    ...fontSize.text16,
    textAlign: 'center',
  },
  otpDescriptionText: {
    marginTop: 20,
    ...fontSize.text13,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  otpInputContainer: {
    flex: 1,
    marginTop: 50,
  },
  veifyOtpBtn: {
    width: 'auto',
    borderRadius: 15,
    marginVertical: 50,
    paddingHorizontal: 18,
  },

  inputStyle: {
    maxHeight: 40,
  },

  phoneNumberContainerStyle: {
    borderWidth: 2,
    borderRadius: 9,
  },
});
