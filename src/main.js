import React from 'react';
import ReactDOM from 'react-dom';

import Home from 'react-components';

let container = document.getElementById('container');
let component = ReactDOM.render(React.createElement(Home), container);