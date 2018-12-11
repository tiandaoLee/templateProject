import React from 'react';
import ReactDom from 'react-dom';

import {
  Router,
  hashHistory
} from 'react-router';

import rootRoute from '../routes';

ReactDom.render((
  <Router history={hashHistory} routes={rootRoute} />
), document.querySelector('#app'));
