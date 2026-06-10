import {decode} from 'base64-arraybuffer';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import fs from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import {showToastMessage} from 'utils/common';
import {constants} from 'utils/constants';

const oneMbInBytes = 1000000;

const Picker = ({
  onPick,
  children,
  containerStyle,
  maxFileSizeInMB = 0,
  context = 'root',
}) => {
  const onPress = async () => {
    try {
      const fileData = {
        fileType: '',
        size: 0,
        uri: '',
        fileName: '',
        blob: null,
      };

      const allowedSize = maxFileSizeInMB * oneMbInBytes;
      if (onPick) {
        const result = await launchImageLibrary();
        if (result?.assets?.length) {
          const {fileName, fileSize, uri, type} = result.assets[0];
          fileData.uri = uri;
          fileData.size = fileSize;
          fileData.fileType = type;
          fileData.fileName = fileName;

          if (maxFileSizeInMB > 0 && fileData?.size > allowedSize) {
            showToastMessage(
              `File size shouldn't exceed ${(
                allowedSize / oneMbInBytes
              ).toFixed(1)}MB`,
              'error',
              context,
            );
            return;
          }

          const decodedUri = decodeURIComponent(fileData?.uri);
          const fileResponse = await fs.readFile(decodedUri, 'base64');
          fileData.blob = decode(fileResponse);
          onPick(fileData);
        }
      }
    } catch (error) {
      console.log('File-picker Error :: ', error);
    }
  };

  return (
    <TouchableOpacity
      hitSlop={constants.hitSlop}
      onPress={onPress}
      style={[containerStyle]}>
      {children}
    </TouchableOpacity>
  );
};

export default Picker;
