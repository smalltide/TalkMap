import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'dva/mobile';
import MapView from 'react-native-maps';

class TalkMap extends Component {
  componentWillMount() {
  }

  onRegionChange(region) {
    this.props.dispatch({
      type: 'Map/regionUpdate',
      payload: { region }
    });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={this.props.region}
        onRegionChange={this.onRegionChange.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ Map }) => {
  const { region } = Map;
  return { region };
};

export default connect(mapStateToProps)(TalkMap);
