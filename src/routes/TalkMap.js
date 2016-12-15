import React, { Component } from 'react';
import { connect } from 'dva/mobile';
import MapView from 'react-native-maps';

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
      <MapView
        style={{ flex: 1 }}
        region={this.props.region}
        showsUserLocation
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
