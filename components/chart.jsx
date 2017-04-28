import React from 'react';
import ReactDOM from 'react-dom';
import Scatterplot from '../assets/scatterplot_d3.js';

class Chart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      scatterplot: null
    };
  }

  componentDidMount() {
    const el =  ReactDOM.findDOMNode(this);
    const scatterplot = new Scatterplot(el, {
      height: 500,
      width: 500,
      padding: 60
    });
    scatterplot.drawChart(this.props.dataset, this.props.xKey, this.props.yKey);
    this.setState({ scatterplot });
  }

  render(){
    return (
      <div id="chart"></div>
    );
  }
}

export default Chart;
