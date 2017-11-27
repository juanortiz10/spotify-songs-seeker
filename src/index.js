import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()

const store = createStore(
  reducer,
  applyMiddleware(routerMiddleware(history), thunk )
)

ReactDOM.render(
  <Provider store={ store }>
    <App history={ history }/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
