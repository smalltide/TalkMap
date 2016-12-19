import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { View, Text, Image } from 'react-native';
import {
  InputItem,
  Button,
  Flex
} from 'antd-mobile';
import { watchChatMessage } from '../services/Chat';


class GroupChat extends Component {
  state = { message: '' };

  componentDidMount() {
    const { owner } = this.props;
    this.unWatchChatMessage = watchChatMessage(owner, this.onChatMessage.bind(this));
  }

  componentWillUnmount() {
    this.unWatchChatMessage();
    this.props.dispatch({
      type: 'Chat/clearChatMessage'
    });
  }

  onChatMessage(val) {
    if (val !== null) {
      const messages = val;
      this.props.dispatch({
        type: 'Chat/updateChatMessage',
        payload: { messages }
      });
    }
  }

  onSendMessage() {
    const { message } = this.state;
    const { owner, users } = this.props;

    this.props.dispatch({
      type: 'Chat/sendChatMessage',
      payload: { owner, users, message }
    });

    this.setState({ message: '' });
  }

  renderChatMessage(messages) {
    return Object.keys(messages).map((key) => {
      const { displayName, message, photoURL } = messages[key];
      return (
        <View key={key} style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5 }}>
          <Image
              style={{ height: 30, width: 30, borderRadius: 15 }}
              source={{ uri: photoURL }}
          />
          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 12, color: 'gray' }}>{displayName}</Text>
            <View style={{ backgroundColor: 'greenyellow', borderRadius: 10, padding: 5 }}>
            <Text style={{ fontSize: 14 }}>{message}</Text>
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 10 }}>
          {this.renderChatMessage(this.props.messages)}
        </View>

        <Flex>
          <Flex.Item style={{ flex: 7, borderTopWidth: 1, borderColor: 'lightgray' }}>
            <InputItem
              value={this.state.message}
              onChange={(value) => this.setState({ message: value })}
            />
          </Flex.Item>
          <Flex.Item>
            <Button
              style={{ flex: 1, borderRadius: 0 }}
              type="primary"
              onClick={this.onSendMessage.bind(this)}
            >
              >
            </Button>
          </Flex.Item>
        </Flex>
      </View>
    );
  }
}

const mapStateToProps = ({ Chat, Map }) => {
  const { messages } = Chat;
  const { users } = Map;
  return { messages, users };
};

export default connect(mapStateToProps)(GroupChat);
