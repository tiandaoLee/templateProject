import React from 'react';

import {
  Button,
  Table
} from 'antd';

import FilterForm from './forms/filterForm';
import FreezeModal from './modals/freezeModal';

import styles from './index.less';

const columns = [{
  title: '自媒体名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '账号状态',
  dataIndex: 'status',
  key: 'status',
  render: text => parseInt(text) === 1 ? '启用中' : parseInt(text) === 0 ? '停用中' : ''
}, {
  title: '账号',
  dataIndex: 'account',
  key: 'account'
}, {
  title: '已发布文章数量',
  key: 'publishAmount',
  dataIndex: 'publishAmount'
}, {
  title: '计费模式',
  key: 'mode',
  dataIndex: 'mode',
  render: (text, record, index) => parseInt(text) === 1 ? '授权使用' : parseInt(text) === 0 ? '按点击计费' : ''
}, {
  title: '操作',
  key: 'operates',
  render: (text, record, index) => (
    <div>
      <a href="#">编辑</a>
      <a href="#">{parseInt(record.status) === 1 ? '停用' : parseInt(record.status) === 0 ? '启用' : ''}</a>
      <a href="#">详情</a>
    </div>
  )
}];

const data = [{
  id: '1',
  name: 'John Brown',
  status: 0,
  account: 'xxxxx@qq.com',
  publishAmount: '1000',
  mode: 1
}, {
  id: '2',
  name: 'Jim Green',
  status: 1,
  account: 'xxxxx@qq.com',
  publishAmount: '1000',
  mode: 1
}, {
  id: '3',
  name: 'Joe Black',
  status: 0,
  account: 'xxxxx@qq.com',
  publishAmount: '1000',
  mode: 1
}, {
  id: '4',
  name: 'Joe Black',
  status: 0,
  account: 'xxxxx@qq.com',
  publishAmount: '1000',
  mode: 1
}, {
  id: '5',
  name: 'Joe Black',
  status: 1,
  account: 'xxxxx@qq.com',
  publishAmount: '1000',
  mode: 1
}, {
  id: '6',
  name: 'Joe Black',
  status: 1,
  account: 'xxxxx@qq.com',
  publishAmount: '1000',
  mode: 1
}, {
  id: '7',
  name: 'Joe Black',
  status: 0,
  account: 'xxxxx@qq.com',
  publishAmount: '1000',
  mode: 1
}];
class WeMedia extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.operate_wrap}>
          <div className={styles.operate_group}>
            <Button type="primary" onClick={FreezeModal.show}>批量冻结</Button>
            <Button type="primary">新增自媒体</Button>
          </div>
          <FilterForm />
        </div>
        <Table
          className="tian-table"
          rowKey="id"
          defaultPageSize={20}
          columns={columns}
          dataSource={data}
          pagination={{showTotal: total => `共${Math.ceil(total / 10)}页`}}
        />
      </div>
    );
  }
};

export default WeMedia;
