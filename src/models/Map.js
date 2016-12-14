import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {
  region: {
    latitude: 25.064676,
    longitude: 121.544358,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01
  },
  myLocation: {
    latitude: 25.064676,
    longitude: 121.544358
  }
};

export default {
  namespace: 'Map',
  state: { ...INITIAL_STATE },
  reducers: {
    updateRegion(state, action) {
      const { region } = action.payload;
      return { ...state, region };
    },
    updateMyLocation(state, action) {
      console.log(action.payload);
      return { ...state, myLocation: action.payload };
    }
  },
  effects: {},
  subscriptions: {}
};
