import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'dva/mobile';
import MapView from 'react-native-maps';

class TalkMap extends Component {
  componentDidMount() {
    this.getMyLocation();
  }

  onRegionChange(region) {
    this.props.dispatch({
      type: 'Map/updateRegion',
      payload: { region }
    });
  }

  getMyLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        this.props.dispatch({
          type: 'Map/updateMyLocation',
          payload: { longitude, latitude }
        });
      },
      () => { },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        followsUserLocation
        region={this.props.region}
        onRegionChangeComplete={this.onRegionChange.bind(this)}
        />
    );
  }
}

const mapStateToProps = ({ Map }) => {
  const { region } = Map;
  return { region };
};

export default connect(mapStateToProps)(TalkMap);
