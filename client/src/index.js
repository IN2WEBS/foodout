import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {combineReducers, createStore} from 'redux';
import ordersReducer from './reducers/ordersReducer';
import menuReducer from './reducers/menuReducer';
import categoriesReducer from './reducers/categoriesReducer';
import activeReducer from './reducers/activeReducer';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
  orders:ordersReducer,
  menu:menuReducer,
  categories:categoriesReducer,
  active:activeReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider  store={store}><App /></Provider>
    , document.getElementById('root'));
registerServiceWorker();

// images
// sass stilius
