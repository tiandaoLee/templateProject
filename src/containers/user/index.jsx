import React from 'react';
import styles from './index.less';
class User extends React.Component {
  render() {
    return (
      <div className={styles.user_wrap}>{ this.props.children }</div>
    );
  };
};

export default User;
