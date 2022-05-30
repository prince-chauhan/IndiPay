
import React from 'react';
import LoginApp from './components/LoginPage';

import { configureStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';

const store = configureStore(reducer)



export default function App() {
  return (
    <Provider store={store}>
      <LoginApp></LoginApp>
    </Provider>
  );
}


