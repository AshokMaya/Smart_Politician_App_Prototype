import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Header from 'components/header/Header';
import DonationFormIcon from 'assets/images/donation.svg';
import PaypalIcon from 'assets/images/paypal.svg';
import PaymentsIcon from 'assets/images/payments.svg';

import { Textinput } from 'components/common/input/Input';
import Button from 'components/common/button/Button';
import { fontSize, fontWeight } from 'assets/typography';
import colors from 'assets/colors';

const initialState = {
  name: '',
  email: '',
  mobile: '',
  donationAmount: '',
};

const errorInitialState = {
  nameError: '',
  emailError: '',
  mobileNumberError: '',
  donationAmountError: '',
};

const DonationFormScreen = ({ navigation }) => {
  const intl = useIntl();
  const [formData, setFormData] = useState(initialState);
  const [errorState, setErrorState] = useState(errorInitialState);
  const [selectedDonationType, setSelectedDonationType] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const updateState = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const { name, email, mobile, donationAmount } = formData;

  const onClickBack = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <Header
        title={intl.formatMessage({ defaultMessage: 'Donation Payment' })}
        onClickBack={onClickBack}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.supportContainer}>
          <DonationFormIcon />
          <Text style={styles.supportText}>
            <FormattedMessage defaultMessage="Donation Form" />
          </Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <Textinput
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.commonInputContainer}
          value={name}
          isError={errorState.nameError}
          containerStyle={styles.commonInput}
          errorMessage={errorState.nameError}
          onChangeText={data => updateState('name', data)}
        />

        <Text style={styles.label}>Email</Text>
        <Textinput
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.commonInputContainer}
          value={email}
          isError={errorState.emailError}
          containerStyle={styles.commonInput}
          errorMessage={errorState.emailError}
          onChangeText={data => updateState('email', data)}
        />

        <Text style={styles.label}>Mobile No</Text>
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

        <Text style={styles.label}>Type of Donation</Text>
        {['Love Offering', 'Bulding Expansion', 'One Time Donation'].map(type => (
          <TouchableOpacity
            key={type}
            style={styles.radioButtonContainer}
            onPress={() => setSelectedDonationType(type)}
          >
            <View style={styles.radioCircle}>
              {selectedDonationType === type && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>{type}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Donation Amount</Text>
        <Textinput
          inputMode="numeric"
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.commonInputContainer}
          value={donationAmount}
          isError={errorState.donationAmountError}
          containerStyle={styles.commonInput}
          errorMessage={errorState.donationAmountError}
          onChangeText={data => updateState('donationAmount', data)}
        />

        <Text style={styles.label}>Payment Methods</Text>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedPaymentMethod('payments')}
        >
          <View style={styles.radioCircle}>
            {selectedPaymentMethod === 'payments' && <View style={styles.selectedRb} />}
          </View>
          <PaymentsIcon width={24} height={24} />
          <Text style={styles.radioText}> Payments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setSelectedPaymentMethod('paypal')}
        >
          <View style={styles.radioCircle}>
            {selectedPaymentMethod === 'paypal' && <View style={styles.selectedRb} />}
          </View>
          <PaypalIcon width={24} height={24} />
          <Text style={styles.radioText}> PayPal</Text>
        </TouchableOpacity>

        <Button
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          title={intl.formatMessage({ defaultMessage: 'Submit' })}
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
  label: {
    alignSelf: 'flex-start',
    marginTop: 22,
    marginBottom: 5,
    marginLeft: 7,
    color: colors.black,
    ...fontWeight.w400,
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
    marginLeft: 7,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
  radioText: {
    color: colors.black,
    ...fontSize.text14,
  },
  submitBtn: {
    height: 40,
    width: '45%',
    marginTop: 30,
    marginBottom: 25,
    borderRadius: 9,
    backgroundColor: colors.primaryColor,
    borderWidth: 1,
  },
  submitBtnText: {
    color: colors.white,
    ...fontWeight.w600,
  },
});

export default DonationFormScreen;
