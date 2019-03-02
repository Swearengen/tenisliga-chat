import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Store from './store/store';

var store = new Store()

ReactDOM.render(<App store={store} />, document.getElementById('root'));
