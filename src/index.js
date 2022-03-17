import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { MoralisProvider } from 'react-moralis'
import {TransactionProvider} from './context/TransactionContext'

// const appId = "gEkQRUXAmNqYRUJAzdHQRWIu1RgdnH8DyHBNoH2Q"
// const serverUrl= "https://vumcrnwhyc0f.usemoralis.com:2053/server"

ReactDOM.render(
  <TransactionProvider>
    <App />
  </TransactionProvider>,
  document.getElementById('root')
);

