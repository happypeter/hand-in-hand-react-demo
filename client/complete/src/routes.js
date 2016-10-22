import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setCurrentUser } from './redux/actions/authActions';

import App from './ui/App';
import SignUp from './ui/auth/SignUp';
import LogIn from './ui/auth/LogIn';
import DashBoard from './ui/DashBoard';
import NewPost from './ui/posts/NewPost';
import EditPost from './ui/posts/EditPost';
import ShowPost from './ui/posts/ShowPost';
import Home from './ui/Home';

if (sessionStorage.getItem('jwtToken')) {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  store.dispatch(setCurrentUser(user));
}

function isAdmin() {
  if (!sessionStorage.getItem('jwtToken') && !sessionStorage.getItem('currentUser')) return false;
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  return user.admin === true ? true : false
}

function requireAuth(nextState, replace) {
  if (!isAdmin()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/dashBoard' component={DashBoard} onEnter={requireAuth}/>
        <Route path='/posts/new' component={NewPost} onEnter={requireAuth}/>
        <Route path='/posts/:post_id' component={ShowPost} />
        <Route path='/posts/:post_id/edit' component={EditPost} onEnter={requireAuth}/>
      </Route>
    </Router>
  </Provider>
);
