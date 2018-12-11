import React from 'react';
import {
  message,
  Modal
} from 'antd';
import 'whatwg-fetch';
import utils from 'src/lib/utils';
import Loading from 'src/components/loading';

const Common = (function() {
  const height = window.innerHeight / 2;
  message.config({
    top: height,
    duration: 3
  });
  // 关闭加载提示框
  const close = (res) => {
    setTimeout(() => {
      Loading.close();
    }, 300);
    return res;
  };
  // 拼接请求参数
  const concatUrl = (params = {}) => {
    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return query;
  };
  // 检查返回code
  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
  return {
    handleError(msg) {
      message.error(msg);
    },
    handleNormal(msg) {
      message.success(msg);
    },
    handleWarn(msg) {
      message.warn(msg);
    },
    /**
     * fetch请求封装
     * @param {*} action 请求线上地址
     * @param {*} data 请求入参
     * @param {*} method 请求方式，默认get
     * @param {*} options 其他参数
     * options为对象格式,值：
     * isLoading(是否激活请求加载动画)
     * isJson(是否设置post请求头contentType为application/json)
     * content 自定义请求参数
     */
    fetch(action, params = {}, method = 'get', options) {
      let url = action;
      let option = {
        method,
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      if (options && options.content) {
        option = Object.assign({}, option, options.content);
      }
      if (options && options.isJson && method === 'post') {
        option.body = JSON.stringify(params);
      }
      if (method === 'get') {
        url = Object.keys(params).length ? url + '?' + concatUrl(params) : url;
      }
      if (options && options.isLoading) {
        Loading.open();
      }
      return fetch(url, option) // eslint-disable-line no-undef
        .then(checkStatus)
        .then(close, close)
        .then((response) => {
          return response.json().then((res) => {
            // 业务接口成功
            if (res.code === '0') {
              return res;
            } else {
              if (res.code === '0400003') {
                Modal.warning({
                  title: '登录失败',
                  content: (
                    <div>
                      <p>您的账号已被冻结，如有疑问，请联系管理员处理<br/>管理员QQ：6666666</p>
                    </div>
                  ),
                  onOk() {
                    utils.logout();
                  }
                });
                throw new Error();
              } else if (res.code === '0400001') {
                Modal.warning({
                  title: '账号安全提示',
                  content: (
                    <div>
                      <p>您账户的登录状态已失效，请重新登录</p>
                    </div>
                  ),
                  onOk() {
                    utils.logout();
                  }
                });
                throw new Error();
              } else {
                Modal.error({
                  title: '系统提示',
                  content: (
                    <div>
                      <p>{res.desc}</p>
                    </div>
                  )
                });
                // this.handleError(res.desc);
                throw new Error(res.desc);
              }
            }
          }, (ex) => {
            throw new Error(`解析JSON字符串出错:${url} ${ex.message}`);
          });
        }, (ex) => {
          throw new Error(`请求服务器出错:${url} ${ex.message}`);
        });
    }
  };
})();

export default Common;
