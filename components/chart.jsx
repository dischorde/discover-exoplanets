import React from 'react';
import ReactDOM from 'react-dom';
import Scatterplot from '../assets/scatterplot_d3.js';

class Chart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scatterplot: null
    };
  }

  componentDidMount() {
    const { dataset, xKey, yKey, height, width, padding } = this.props;
    const node =  ReactDOM.findDOMNode(this);
    const scatterplot = new Scatterplot(node, {
      height,
      width,
      padding
    });
    scatterplot.drawChart(dataset, xKey, yKey);
    this.setState({ scatterplot });
  }

  componentWillReceiveProps({ dataset, xKey, yKey }) {
    if (xKey !== this.props.xKey || yKey !== this.props.yKey) {
      this.state.scatterplot.updateChart(dataset, xKey, yKey);
    }
  }

  render(){
    return (
      <div id="chart"></div>
    );
  }
}

export default Chart;
