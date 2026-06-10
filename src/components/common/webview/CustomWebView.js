import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const CustomWebView = ({htmlContent, src, ...props}) => {
  const onOpenLinks = request => {
    if (request?.url?.includes('https')) {
      if (Linking.canOpenURL(request?.url)) {
        Linking.openURL(request?.url);
      }
      return false;
    }
    return true;
  };

  const source = src
    ? {uri: src}
    : {
        html: ` <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1"></meta>
                </head>
                <body>
                ${htmlContent}
                </body>
                </html>`,
      };
  return (
    <WebView
      source={source}
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onShouldStartLoadWithRequest={onOpenLinks}
      {...props}
    />
  );
};

export default CustomWebView;

const styles = StyleSheet.create({
  container: {width: '100%'},
});
