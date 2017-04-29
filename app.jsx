import React from 'react';
import ReactDOM from 'react-dom';
import values from 'lodash/values';

import InteractivePlot from './components/interactive_plot.jsx';


document.addEventListener('DOMContentLoaded', function () {
  d3.csv("assets/phl_hec_all_confirmed.csv", (error, data) => {
    if (error) throw error;
    ReactDOM.render(<InteractivePlot data={values(data)} />, document.getElementById('root'));
  });
});
