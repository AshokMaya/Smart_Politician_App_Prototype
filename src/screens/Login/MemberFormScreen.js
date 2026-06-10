import Header from 'components/header/Header';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MemberFormIcon from 'assets/images/memberForm.svg';
import { fontSize, fontWeight } from 'assets/typography';
import colors from 'assets/colors';
import { Textinput } from 'components/common/input/Input';
import Button from 'components/common/button/Button';



const initialState = {
    name: '',
    dob: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    wardName: '',
    wardNumber: '',
    address: '',
};

const errorInitialState = {
    nameError: '',
    dobError: '',
    mobileNumberError: '',
    emailError: '',
    stateError: '',
    cityError: '',
    wardNameError: '',
    wardNumberError: '',
    addressError: '',
};

const MemberFormScreen = ({ navigation }) => {
    const intl = useIntl();
    const [formData, setState] = useState(initialState);

    const [errorState, setErrorState] = useState(errorInitialState);


    const updateState = (key, val) =>
        setState(prevState => ({ ...prevState, [key]: val }));

    const { name, dob, mobile, email, state, city, wardName, wardNumber, address } = formData;

    const onClickBack = () => {
        if (navigation?.canGoBack()) {
            navigation?.goBack();
        }
    };

    return (
        <>
            <Header
                title={intl.formatMessage({
                    defaultMessage: 'Member Form',
                })}
                onClickBack={onClickBack}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.supportContainer}>
                    <MemberFormIcon />
                    <Text style={styles.supportText}>
                        <FormattedMessage defaultMessage="MEMBER FORM" />
                    </Text>
                </View>
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={name}
                    isError={errorState.nameError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.nameError}
                    onChangeText={data => updateState('name', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Candidate Name',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={dob}
                    isError={errorState.dobError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.dobError}
                    onChangeText={data => updateState('dob', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Date of Birth',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    maxLength={10}
                    inputMode="numeric"
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={mobile}
                    isError={errorState.mobileNumberError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.mobileNumberError}
                    onChangeText={data => updateState('mobile', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Mobile Number',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={email}
                    isError={errorState.emailError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.emailError}
                    onChangeText={data => updateState('email', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Email',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={state}
                    isError={errorState.stateError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.stateError}
                    onChangeText={data => updateState('state', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'State',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={city}
                    isError={errorState.cityError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.cityError}
                    onChangeText={data => updateState('city', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'City',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={wardName}
                    isError={errorState.wardNameError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.wardNameError}
                    onChangeText={data => updateState('wardName', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Ward Name',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={wardNumber}
                    isError={errorState.wardNumberError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.wardNumberError}
                    onChangeText={data => updateState('wardNumber', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Ward Number',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Textinput
                    inputStyle={[styles.inputStyle, styles?.inputStyle]}
                    inputContainerStyle={styles.commonInputContainer}
                    value={address}
                    isError={errorState.addressError}
                    containerStyle={[styles.commonInput]}
                    errorMessage={errorState.addressError}
                    onChangeText={data => updateState('address', data)}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Address',
                    })}
                    placeholderStyle={styles.placeholdertext}
                />
                <Button
                    style={[styles.submitBtn]}
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
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
        alignItems: 'center',
    },
    supportText: {
        marginTop: 12,
        ...fontSize.text15,
        color: colors.black,
        ...fontWeight.w800
    },
    commonInput: {
        marginTop: 22,
        paddingHorizontal: 10,
    },

    commonInputContainer: {
        borderRadius: 7,
        borderWidth: 0,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 7,
    },
    labelStyle: {
        marginTop: 22,
    },
    submitBtn: {
        height: 40,
        width: '45%',
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 9,
        backgroundColor: colors.maroon,
        borderColor: colors.white
    },
    submitBtnText: {
        color: colors.white,
        ...fontWeight.w400,
    },
    placeholdertext : {
        ...fontWeight.w300
    }
});

export default MemberFormScreen;
