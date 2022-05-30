
import React from 'react';
import LoginApp from './components/LoginPage';

import { createStore } from 'redux';
import { Provider } from 'react-redux';


const store = createStore()

export default function App() {
  return (
    <LoginApp></LoginApp>
  );
}


