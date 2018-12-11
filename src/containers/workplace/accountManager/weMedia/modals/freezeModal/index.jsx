/**
 * 自媒体账号管理页面冻结账户model框
 */
import React from 'react';

import {
  Modal,
  Checkbox,
  Row,
  Col
} from 'antd';

import styles from './index.less';

const freezeModal = (function() {
  let _ref;
  const handleCheckboxChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };
  const _show = () => {
    _ref = Modal.confirm({
      iconType: 'a',
      title: <div className={styles.text_center}>是否确认冻结</div>,
      content:
        (<Checkbox.Group className={styles.width_100_percent} onChange={handleCheckboxChange}>
          <Row>
            <Col span={24}><Checkbox value="0">冻结账户</Checkbox></Col>
            <Col span={24}><Checkbox value="1">停止抓取该账号的所有文章</Checkbox></Col>
            <Col span={24}><Checkbox value="2">下线该账号的所有文章</Checkbox></Col>
          </Row>
        </Checkbox.Group>),
      okText: '确认',
      onOk: () => {},
      cancelText: '取消'
    });
  };
  const _close = () => {
    _ref && _ref.destroy();
  };
  return {
    show: _show,
    close: _close
  };
})();

export default freezeModal;
