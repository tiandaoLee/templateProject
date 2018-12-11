import React from 'react';

class Workplace extends React.Component {
  render() {
    return (
      <div>{ this.props.children }</div>
    );
  };
};

export default Workplace;
