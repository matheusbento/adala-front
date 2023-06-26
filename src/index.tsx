import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.scss';
import { SystemProvider } from './hooks/System';
import LanguageContainer from './LanguageContainer';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SystemProvider>
      <LanguageContainer />
    </SystemProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
