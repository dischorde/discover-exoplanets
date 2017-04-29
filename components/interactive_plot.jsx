import React from 'react';
import Chart from './chart.jsx';
import Dropdown from './dropdown.jsx';

class InteractivePlot extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      xKey: "P. Mass (EU)",
      yKey: "P. Gravity (EU)"
    };
  }

  handleChange(axis) {
    return e => (
      this.setState({
        [axis]: e.target.value
      })
    );
  }

  render(){
    const {xKey, yKey} = this.state;

    return (
      <section className="interactive-plot">
        <h1>Exoplanet Data Explorer</h1>

        <section className="axes-info">
          <div className="axis-changer">
            <h3>X-Axis</h3>
            <Dropdown axis={"xKey"}
              columns={this.props.columns}
              selected={this.state.xKey}
              handleChange={this.handleChange("xKey")}/>
          </div>

          <div className="axis-changer">
            <h3>Y-Axis</h3>
            <Dropdown axis={"yKey"}
              columns={this.props.columns}
              selected={this.state.yKey}
              handleChange={this.handleChange("yKey")}/>
          </div>
        </section>

          <Chart dataset={this.props.data}
                 xKey={xKey}
                 yKey={yKey}
                 height={.72 * window.innerHeight}
                 width={.8 * window.innerWidth}
                 padding={40} />
          <h2>{`${xKey} vs. ${yKey}`}</h2>
      </section>
    );
  }
}

export default InteractivePlot;
