import React from 'react';
import Chart from './chart.jsx';

// data for testing
const dataset = [
                 [ 34,     78 ],
                 [ 109,   280 ],
                 [ 310,   120 ],
                 [ 79,   411 ],
                 [ 420,   220 ],
                 [ 233,   145 ],
                 [ 333,   96 ],
                 [ 222,    333 ],
                 [ 78,    320 ],
                 [ 21,   123 ]
               ];

class InteractivePlot extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h1>Exoplanet Data Explorer</h1>
          <Chart dataset={dataset} xKey={0} yKey={1} />
      </div>
    );
  }
}

export default InteractivePlot;
