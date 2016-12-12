import React from 'react';
import { connect } from 'dva/mobile';
import { Scene, Router } from 'react-native-router-flux';

import Splash from './components/Splash';

import LoginForm from './routes/LoginForm';
import Hello from './routes/HelloComponent';
import AsyncHello from './routes/AsyncHelloHelloComponent';

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
        splashText="Hello Splash"
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
          key="hello"
          component={Hello}
          title="Hello"
        />

        <Scene
          key="asyncHello"
          component={AsyncHello}
          title="AsyncHello"
        />
      </Scene>
    </Router>
  );
};

export default connect()(RouterComponent);
