import { Actions } from 'react-native-router-flux';
import { sayHelloAsync } from '../services/Hello';

const INITIAL_STATE = {
  syncMessage: '',
  asyncMessage: 'wait 2 second...'
};

export default {
  namespace: 'Hello',
  state: { ...INITIAL_STATE },
  reducers: {
    hello(state, action) {
      return { ...state, syncMessage: `Hello ${action.payload}` };
    },
    asyncHelloSuccess(state, action) {
      return { ...state, asyncMessage: `Hello ${action.payload}` };
    }
  },
  effects: {
    * asyncHello({ payload }, { call, put }) {
      Actions.asyncHello();

      const message = yield call(sayHelloAsync, payload);
      yield put({ type: 'asyncHelloSuccess', payload: message });
    }
  },
  subscriptions: {}
};
