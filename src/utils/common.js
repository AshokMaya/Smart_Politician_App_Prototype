import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';


export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return await JSON.parse(value || {});
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const clearItems = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const validateEmail = email => {
  return new RegExp(/^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/, '').test(email);
};

export const validatePassword = password => {
  return new RegExp(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    '',
  ).test(password);
};


export const debounce = (func, wait = 500, immediate = false) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

export const isValidMobileNumber = mobileNumber =>
  /^\d.{9,}/.test(mobileNumber);

/**
 show toast message like android
 @param message - message to show on toast
 @param status - **success**, **error** show status icons (optional)
 @param context - **root** to show global toast (default), **modal** to show toast inside modal
 */
export const showToastMessage = (
  message = '',
  status = '',
  context = 'root',
) => {
  DeviceEventEmitter.emit('toast', {message, status, context});
};
