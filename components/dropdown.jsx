import React from 'react';


class Dropdown extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let options = this.props.columns.map((title, i) => (
      <option key={`${this.props.axis}${i}`} value={title}>{title}</option>
    ));

    return (
      <select onChange={this.props.handleChange}>
        { options }
      </select>
    );
  }
}

export default Dropdown;
