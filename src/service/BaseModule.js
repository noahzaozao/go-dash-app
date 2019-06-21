import axios from 'axios';
import { Loading, Message } from 'element-ui';
import RETURN_CODE from '../config/returnCode';

class BaseModule {
  constructor () {
    this.$http = axios.create({
      baseURL: 'http://api.7mud.com/api'
    });

    // 配置请求头
    this.$http.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
    // 响应时间
    this.$http.defaults.timeout = 5 * 1000;

    let loadingInstance = '';
    // POST传参序列化(添加请求拦截器)
    this.$http.interceptors.request.use(
      config => {
        // 加载动画
        loadingInstance = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        config.headers['Authorization'] = localStorage.getItem('jwt_token');
        return config;
      },
      err => {
        loadingInstance.close();
        Message.warning('请求错误');
        return Promise.reject(err);
      }
    );

    // 返回状态判断(添加响应拦截器)
    this.$http.interceptors.response.use(
      res => {
        // 判断return_code
        switch (res.data.return_code) {
          case RETURN_CODE.OK:
            loadingInstance.close();
            return res.data;
          case RETURN_CODE.NOT_LOGIN:
            loadingInstance.close();
            Message.warning(res.data.return_message);
            localStorage.removeItem('jwt_token');
            setTimeout(function () {
              window.location.href = '/login';
            }, 1000);
            return res;
          default:
            loadingInstance.close();
            Message.warning(res.data.return_message);
            return res;
        }
      },
      err => {
        loadingInstance.close();
        Message.error('请求失败，请稍后再试');
        return Promise.reject(err);
      }
    );
  }

  post (url, data = undefined, config = {}) {
    return this.$http.post(url, data, { ...config });
  }
}

export default BaseModule;
