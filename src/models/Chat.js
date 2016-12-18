import {
  updateChatMessage
} from '../services/Chat';

const INITIAL_STATE = {
  messages: []
};

export default {
  namespace: 'Chat',
  state: { ...INITIAL_STATE },
  reducers: {
    updateChatMessage(state, action) {
      const { messages } = action.payload;
      return { ...state, messages };
    },
    clearChatMessage(state) {
      return { ...state, ...INITIAL_STATE };
    }
  },
  effects: {
    * sendChatMessage({ payload }, { call }) {
      yield call(updateChatMessage, payload);
    }
  },
  subscriptions: {}
};
