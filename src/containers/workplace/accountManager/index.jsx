import React from 'react';

class AccountManager extends React.Component {
  render() {
    return (
      <div>{ this.props.children }</div>
    );
  };
};

export default AccountManager;
