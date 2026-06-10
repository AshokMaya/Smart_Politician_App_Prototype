import Header from 'components/header/Header';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import SupportIcon from 'assets/icons/homeIcons/support.svg';
import { fontSize, fontWeight } from 'assets/typography';
import colors from 'assets/colors';
import { Textinput } from 'components/common/input/Input';
import Button from 'components/common/button/Button';

const initialState = {
  name: '',
  mobile: '',
  comments: '',
};

const errorInitialState = {
  mobileNumberError: '',
  nameError: '',
  commentsError: '',
};

const SupportScreen = ({ navigation }) => {
  const intl = useIntl();
  const [formData, setState] = useState(initialState);
  const [errorState, setErrorState] = useState(errorInitialState);

  const updateState = (key, val) =>
    setState(prevState => ({ ...prevState, [key]: val }));

  const { name, mobile, comments } = formData;

  const onClickBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  return (
    <>
      <Header
        title={intl.formatMessage({
          defaultMessage: 'Support',
        })}
        onClickBack={onClickBack}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.supportContainer}>
          <SupportIcon />
          <Text style={styles.supportText}>
            <FormattedMessage defaultMessage="SUPPORT" />
          </Text>
        </View>

        <Text style={styles.label}>NAME</Text>
        <Textinput
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.commonInputContainer}
          value={name}
          isError={errorState.nameError}
          containerStyle={styles.commonInput}
          errorMessage={errorState.nameError}
          onChangeText={data => updateState('name', data)}
        />

        <Text style={styles.label}>MOBILE NO</Text>
        <Textinput
          maxLength={10}
          inputMode="numeric"
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.commonInputContainer}
          value={mobile}
          isError={errorState.mobileNumberError}
          containerStyle={styles.commonInput}
          errorMessage={errorState.mobileNumberError}
          onChangeText={data => updateState('mobile', data)}
        />
        
        <Text style={styles.label}>COMMENTS</Text>
        <Textinput
          multiline
          numberOfLines={5}
          inputStyle={[styles.inputStyle, styles.commentBox]}
          inputContainerStyle={styles.commonInputContainer}
          value={comments}
          isError={errorState.commentsError}
          containerStyle={styles.commonInput}
          errorMessage={errorState.commentsError}
          onChangeText={data => updateState('comments', data)}
        />

        <Button
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          title={intl.formatMessage({
            defaultMessage: 'Submit',
          })}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  supportContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  supportText: {
    marginTop: 12,
    ...fontSize.text15,
    color: colors.black,
  },
  commonInput: {
    marginTop: 8,
    width: '100%',
  },
  commonInputContainer: {
    borderWidth: 1,
    borderRadius: 9,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inputStyle: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlign: 'left',
  },
  commentBox: {
    height: 155,
    textAlignVertical: 'top',
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 22,
    marginBottom: 5,
    marginLeft: 7,
    color: colors.black,
    ...fontWeight.w300,
  },
  submitBtn: {
    height: 40,
    width: '45%',
    marginTop: 30,
    marginBottom: 25,
    borderRadius: 9,
    backgroundColor: colors.white,
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },
  submitBtnText: {
    color: colors.black,
    ...fontWeight.w400,
  },
});

export default SupportScreen;
