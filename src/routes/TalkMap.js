import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import {
  InputItem,
  Button,
  Flex
} from 'antd-mobile';

class TalkMap extends Component {
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 10 }}
          region={this.props.region}
          showsUserLocation
          onRegionChangeComplete={this.onRegionChange.bind(this)}
        />
        <Flex>
          <Flex.Item style={{ flex: 7 }}>
            <InputItem />
          </Flex.Item>
          <Flex.Item>
            <Button style={{ flex: 1, borderRadius: 0 }} type="primary">
              >
            </Button>
          </Flex.Item>
        </Flex>
      </View>
    );
  }
}

const mapStateToProps = ({ Map }) => {
  const { region } = Map;
  return { region };
};

export default connect(mapStateToProps)(TalkMap);
