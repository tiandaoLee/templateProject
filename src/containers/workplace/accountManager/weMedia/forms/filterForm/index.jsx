/**
 * 自媒体账号页面删选条件表单
 */
import React from 'react';

import {
  Form,
  Input,
  Button,
  Select
} from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
// {
//   "account": "zwb1",
//   "currentPage": 0,
//   "freezenStatus": 1,
//   "nickName": "string",
//   "pageSize": 5
// }
class Filter extends React.Component {
  // 判断表单中是否有未校验通过项
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  // 处理删选表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('errors in form');
      } else {
        console.log(values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    // 设置字段及参数（包括初始值，校验规则等等）
    let keywordProps = getFieldDecorator('keyword', {
      rules: [{ required: true, message: '关键字不能为空!', initialValue: '0' }]
    });
    let statusProps = getFieldDecorator('status', {
      initialValue: '0'
    });
    let typeProps = getFieldDecorator('type', {
      initialValue: '0'
    });
    // 只有在表单项已经touched的情况下才能显示错误
    const keywordError = isFieldTouched('keyword') && getFieldError('keyword');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="状态">
          {statusProps(
            <Select className={styles.status_select}>
              <Option value="0">全部</Option>
              <Option value="1">启动</Option>
              <Option value="2">停止</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {typeProps(
            <Select className={styles.type_select}>
              <Option value="0">按名称</Option>
              <Option value="1">按账号</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          validateStatus={keywordError ? 'error' : 'success'}
          help={keywordError || ''}
          hasFeedback
        >
          {keywordProps(
            <Input type="input" placeholder="请输入关键字" className={styles.keyword_input}/>
          )}
        </FormItem>
        <FormItem >
          <Button
            type="primary"
            onClick={this.handleSubmit}
            disabled={this.hasErrors(getFieldsError())}
          >
            搜索
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const FilterForm = Form.create({})(Filter);
export default FilterForm;
