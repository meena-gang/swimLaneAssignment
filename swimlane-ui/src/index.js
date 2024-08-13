import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client'; 
import swimlaneReducer from './store/slice';
import App from './App';

const store = configureStore({
  reducer: {
    swimlane: swimlaneReducer,
  },
});
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

