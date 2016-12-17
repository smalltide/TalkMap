import firebase from 'firebase';
import {
  updateUserLocation,
  updateUserMessage,
  watchMapUsers
} from '../services/Map';

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
  },
  users: []
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
    },
    updateUsers(state, action) {
      const usersObject = action.payload;
      const users = Object.values(usersObject);

      return { ...state, users };
    }
  },
  effects: {
    * updateMyLocation({ payload }, { call }) {
      yield call(updateUserLocation, payload);
    },
    * sendMessage({ payload }, { call }) {
      yield call(updateUserMessage, payload);
    },
  },
  subscriptions: {
    monitorUsers({ dispatch }) {
      let unWatchNode = null;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          unWatchNode = watchMapUsers((val) => {
            dispatch({ type: 'updateUsers', payload: val });
          });
        } else {
          unWatchNode();
        }
      });
    }
  }
};
