import React from 'react';
import { connect } from 'dva/mobile';
import { Scene, Router } from 'react-native-router-flux';

import Splash from './components/Splash';

import LoginForm from './routes/LoginForm';
import TalkMap from './routes/TalkMap';
import GroupChat from './routes/GroupChat';

const RouterComponent = ({ dispatch }) => {
  function onLogout() {
    dispatch({ type: 'Auth/logoutUser' });
  }

  return (
    <Router sceneStyle={{ paddingTop: 65 }}>

      <Scene
        key="splash"
        hideNavBar
        passProps
        splashText="Talk Map"
        component={Splash}
      />

      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" />
      </Scene>

      <Scene key="main">
        <Scene
          initial
          onRight={onLogout}
          rightTitle="Logout"
          key="talkMap"
          component={TalkMap}
          title="TalkMap"
        />

        <Scene
          key="groupChat"
          component={GroupChat}
          title="Chat"
        />
      </Scene>
    </Router>
  );
};

export default connect()(RouterComponent);
