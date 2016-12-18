import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import { View, Text } from 'react-native';
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
      const { displayName, message } = messages[key];
      return (
        <Text key={key}>{displayName}: {message}</Text>
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
          <Flex.Item style={{ flex: 7 }}>
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
