import React from 'react';
import { AppRegistry } from 'react-native';
import dva from 'dva/mobile';

import Initial from './src/models/Initial';
import Map from './src/models/Map';
import Auth from './src/models/Auth';

import Router from './src/Router';

const app = dva();

app.model(Initial);
app.model(Map);
app.model(Auth);

app.router(() => <Router />);

AppRegistry.registerComponent('app_starter', () => app.start());
