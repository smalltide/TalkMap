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
      return { ...state, region: action.payload };
    },
    updateMyLocation(state, action) {
      const myLocation = action.payload;
      const region = { ...state.region, ...myLocation };
      return { ...state, myLocation, region };
    }
  },
  effects: {},
  subscriptions: {}
};
