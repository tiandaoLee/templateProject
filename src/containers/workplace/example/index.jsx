import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import {
  Button
} from 'antd';
import store from './store';
import styles from './example.less';
// 修饰器函数注入store
@observer
class Example extends React.Component {
  componentDidMount() {
    console.log(store);
    store.fetch();
  }
  render() {
    // 从store里获取计算属性 data 以及action
    const {data, addNum, isMoreThanFive} = store;
    return (
      <div>
        Example! <span className={styles.test}>CSS Modules Go</span>
        <br />
        <Button><Link to="example/lv3">route to example/lv3</Link></Button>
        <span>{data.num}</span>
        <span>数字是否大于5{isMoreThanFive}</span>
        <Button onClick={() => { addNum(); }}>点击增加数字</Button>
        {this.props.children}
      </div>
    );
  }
}

export default Example;
