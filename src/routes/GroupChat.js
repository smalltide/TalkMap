import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'dva/mobile';

class GroupChat extends Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View>
        <Text>Chat</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ Chat }) => {
  const { users, messages } = Chat;
  return { users, messages };
};

export default connect(mapStateToProps)(GroupChat);
