import React from 'react';
import md5 from 'js-md5';

import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Modal
} from 'antd';

import common from 'src/lib/common';
import utils from 'src/lib/utils';

import InfoModal from './modals/infoModal';

import styles from './index.less';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modal: {
        title: '',
        content: ''
      }
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { account, passwd } = values;
        common.fetch('/account/login', {account, passwd: md5(passwd)}, 'get')
          .then((res) => {
            const data = res.data;
            console.log(data);
            // 登陆成功之后不需要设置token
            utils.jumpTo('/workplace');
          });
      }
    });
  }
  handleOk = () => {
    this.setState({modalVisible: false});
  }
  handleForgot = () => {
    Modal.info({
      title: '忘记密码',
      content: (
        <div>
          <span>如果您忘记了自己的登录密码或者账号信息，请联系管理员处理。<br />管理员QQ：6666666</span>
        </div>
      )
    });
  }
  handleRegister = () => {
    const content = (<div>
      <p>天天趣闻是一款资讯类APP，目前已拥有庞大用户群。同时，我们也在扩展我们的自媒体业务，如果您感兴趣并想加入我们，可以：</p>
      <p>1.发送您的姓名、公众号/其他自媒体平台账号、联系方式至ttqw@tuia.cn，我们将尽快与您取得联系。</p>
      <p>2.商务合作QQ：123456</p>
    </div>);
    Modal.info({
      title: '申请入驻',
      content
    });
  }
  render() {
    const hiddenRemember = true;
    const { getFieldDecorator } = this.props.form;
    const { modal, modalVisible } = this.state;
    const { title, content } = modal;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.login_form}>
        <FormItem className={styles.login_title_wrap}>
          <div className={styles.login_title}>登录</div>
        </FormItem>
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '账号不能为空!', whitespace: true }]
          })(
            <Input prefix={<Icon type="user" className={styles.login_form_input} />} placeholder="请输入账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passwd', {
            rules: [{ required: true, message: '密码不能为空!', whitespace: true }]
          })(
            <Input prefix={<Icon type="lock" className={styles.login_form_input} />} type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem >
          {!hiddenRemember ? getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>下次自动登陆</Checkbox>
          ) : null}
          <a className={styles.login_form_register} onClick={this.handleForgot}>忘记密码</a>
          <a onClick={this.handleRegister} className={styles.login_form_forgot}>申请入驻</a>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            登录
          </Button>
        </FormItem>
        <InfoModal title={title} visible={modalVisible} onOk={this.handleOk} content={content}/>
      </Form>
    );
  }
}

export default Form.create()(Login);
