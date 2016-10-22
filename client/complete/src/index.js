import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { renderRoutes } from './routes';

injectTapEventPlugin();
render(renderRoutes(), document.getElementById('root'));
