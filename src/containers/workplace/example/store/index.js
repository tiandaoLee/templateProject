import { observable, action, computed } from 'mobx';
import common from 'src/lib/common';

class State {
  // 默认data
  @observable data = {
    num: 1
  };
  // 计算属性
  @computed
  get isMoreThanFive() {
    if (this.data.num > 5) {
      return 'true';
    } else {
      return 'false';
    }
  }
  // 拉取数据action
  @action
  fetch = () => {
    common.fetch('example/getNum').then((res) => {
      if (res.code === '0') {
        this.data = res.data;
      }
    });
  }
  // 修改action
  @action
  addNum = () => {
    this.data.num++;
  }
}
// 实例化store
const store = new State();

export default store;
