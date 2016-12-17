import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import MapView from 'react-native-maps';
import { View, Text, Image } from 'react-native';
import {
  InputItem,
  Button,
  Flex
} from 'antd-mobile';

class TalkMap extends Component {
  state = { message: '' };

  componentDidMount() {
    this.getMyLocation();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.props.dispatch({
      type: 'Map/updateRegion',
      payload: region
    });
  }

  onSendMessage() {
     const { message } = this.state;

     this.props.dispatch({
      type: 'Map/sendMessage',
      payload: { message }
    });

    this.setState({ message: '' });
  }

  getMyLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.updateMyLocation(position);
      },
      () => { },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.updateMyLocation(position);
    });
  }

  updateMyLocation(position) {
    const { longitude, latitude } = position.coords;
    this.props.dispatch({
      type: 'Map/updateMyLocation',
      payload: { longitude, latitude }
    });
  }

  renderUsersMarker(users) {
    return users.map((user) => {
      const { uid, displayName, message, photoURL, online, latitude, longitude } = user;
      const color = online === 1 ? 'lime' : 'orangered';
      return (
        <MapView.Marker
          key={uid}
          coordinate={{ latitude, longitude }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{ height: 30, width: 30, borderRadius: 15, borderWidth: 2, borderColor: color }}
              source={{ uri: photoURL }}
            />
            <Text>{displayName}</Text>
          </View>
          <MapView.Callout style={{ width: 200, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{message}</Text>
          </MapView.Callout>
        </MapView.Marker>
      );
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 10 }}
          region={this.props.region}
          showsUserLocation
          onRegionChangeComplete={this.onRegionChange.bind(this)}
        >
          {this.renderUsersMarker(this.props.users)}
        </MapView>

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

const mapStateToProps = ({ Map }) => {
  const { region, myLocation, users } = Map;
  return { region, myLocation, users };
};

export default connect(mapStateToProps)(TalkMap);
