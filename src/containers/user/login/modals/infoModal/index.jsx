/**
 * 提示信息弹窗
 */
import React from 'react';

import {
  Modal,
  Button
} from 'antd';

import './index.less';

class InfoModal extends React.Component {
  render() {
    const {content, onOk, ...rest} = this.props;
    return (
      <Modal
        {...rest}
        wrapClassName="vertical-center-modal"
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={onOk}>
            好的
          </Button>
        ]}
      >
        { content }
      </Modal>
    );
  }
}

export default InfoModal;
