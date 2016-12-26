import _ from 'lodash';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {};

export default {
  namespace: 'Initial',
  state: { ...INITIAL_STATE },
  reducers: {},
  effects: {},
  subscriptions: {
    initializeFirebase() {
      const config = {
        apiKey: 'AIzaSyBakUPnLpUrujnjaTF62NtuqsAD7NshbMw',
        authDomain: 'talkmap-46a61.firebaseapp.com',
        databaseURL: 'https://talkmap-46a61.firebaseio.com',
        storageBucket: 'talkmap-46a61.appspot.com',
        messagingSenderId: '320827629895'
      };

      if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }
    },
    monitorAuth() {
      _.delay(() => {
        firebase.auth().onAuthStateChanged((user) => {
          checkUser(user);
        });
      }, 1500);
    }
  }
};

function checkUser(user) {
  if (user) {
    Actions.main({ type: 'reset' });
  } else {
    Actions.auth({ type: 'reset' });
  }
}
