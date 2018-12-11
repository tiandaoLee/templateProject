import { hashHistory } from 'react-router';

import cookie from './cookie';

const utils = (function() {
  return {
    // history跳转
    jumpTo(url) {
      hashHistory.push(url);
    },
    // 登出函数
    logout() {
      // 先清除cookie
      cookie.removeItem('news_media_token');
      hashHistory.push('/user/login');
    }
  };
})();

export default utils;
