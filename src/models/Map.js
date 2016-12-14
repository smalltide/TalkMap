import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {
  region: {
    latitude: 25.064676,
    longitude: 121.544358,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  }
};

export default {
  namespace: 'Map',
  state: { ...INITIAL_STATE },
  reducers: {
    regionUpdate(state, action) {
      const { region } = action.payload;
      return { ...state, region };
    }
  },
  effects: {},
  subscriptions: {}
};
