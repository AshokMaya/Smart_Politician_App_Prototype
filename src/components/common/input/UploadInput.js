import UploadIcon from 'assets/icons/upload.svg';
import React from 'react';
import Picker from '../picker/Picker';
import {Textinput} from './Input';

const UploadInput = ({onPick, maxFileSizeInMB = 3, ...props}) => {
  return (
    <Picker onPick={onPick} maxFileSizeInMB={maxFileSizeInMB}>
      <Textinput disabled inputIcon={<UploadIcon />} {...props} />
    </Picker>
  );
};

export default UploadInput;
