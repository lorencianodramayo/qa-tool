import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

//redux
import { Provider } from 'react-redux';
import AppStore from './store';

//Page
import { App } from './pages';

//global styles
import './assets/less/Global/custom.less';


const { store } = AppStore;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
