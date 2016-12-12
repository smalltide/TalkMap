import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'dva/mobile';

const AsyncHelloComponent = ({ asyncMessage }) => {
  return (
    <View>
      <Text>
        {asyncMessage}
      </Text>
    </View>
  );
};

const mapStateToProps = ({ Hello }) => {
  const { asyncMessage } = Hello;
  return { asyncMessage };
};

export default connect(mapStateToProps)(AsyncHelloComponent);
