import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import img from './assets/images/react-logo.png';

const App: React.FC = () => (
  <div>
    <img src={img} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));