
import React from 'react';
import LoginApp from './components/LoginPage';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';

const store = createStore(reducer)



export default function App() {
  return (
    <Provider store={store}>
      <LoginApp></LoginApp>
    </Provider>
  );
}


