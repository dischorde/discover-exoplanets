import React from 'react';
import Chart from './chart.jsx';

class InteractivePlot extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      xKey: "P. Mass (EU)",
      yKey: "P. Gravity (EU)"
    };
  }

  render(){
    const {xKey, yKey} = this.state;

    return (
      <div>
        <h1>Exoplanet Data Explorer</h1>
          <h2>{`${xKey} vs. ${yKey}`}</h2>
          <Chart dataset={this.props.data}
                 xKey={xKey}
                 yKey={yKey}
                 height={500}
                 width={800}
                 padding={40} />
      </div>
    );
  }
}

export default InteractivePlot;
