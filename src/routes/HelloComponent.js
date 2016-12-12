import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'dva/mobile';
import {
  WhiteSpace,
  WingBlank,
  Button,
} from 'antd-mobile';

class HelloComponent extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: 'Hello/hello',
      payload: 'sync message'
    });
  }

  onAsyncHello() {
    this.props.dispatch({
      type: 'Hello/asyncHello',
      payload: 'async message'
    });
  }

  render() {
    return (
      <View>
        <WingBlank>
          <Text>
            {this.props.syncMessage}
          </Text>
          <WhiteSpace />
          <Button type="primary" onClick={this.onAsyncHello.bind(this)}>
            Async Hello
          </Button>
        </WingBlank>
      </View>
    );
  }
}

const mapStateToProps = ({ Hello }) => {
  const { syncMessage } = Hello;
  return { syncMessage };
};

export default connect(mapStateToProps)(HelloComponent);
