import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';

import Initial from './src/models/Initial';
import Auth from './src/models/Auth';
import Map from './src/models/Map';
import Chat from './src/models/Chat';

import Router from './src/Router';

const app = dva();

app.model(Initial);
app.model(Auth);
app.model(Map);
app.model(Chat);

app.router(() => <Router />);

AppRegistry.registerComponent('app_starter', () => app.start());
