import React from 'react';
import ReactDOM from 'react-dom';

import InteractivePlot from './components/interactive_plot.jsx';


document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<InteractivePlot />, document.getElementById('root'));
});
