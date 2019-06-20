import axios from 'axios';
import { Loading, Message } from 'element-ui';
import RETURN_CODE from '../config/returnCode';

class BaseModule {
  constructor () {
    this.axios = axios;

    // 配置请求头
    this.axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
    // 响应时间
    this.axios.defaults.timeout = 5 * 1000;
    // 配置接口地址
    this.axios.defaults.baseURL = 'http://api.7mud.com/api';

    let loadingInstance = '';
    // POST传参序列化(添加请求拦截器)
    this.axios.interceptors.request.use(
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
    this.axios.interceptors.response.use(
      res => {
        if (res.data.return_code === RETURN_CODE.OK) {
          loadingInstance.close();
        } else if (res.data.return_code === RETURN_CODE.NOT_LOGIN) {
          loadingInstance.close();
          localStorage.removeItem('jwt_token');
          setTimeout(function () {
            window.location.href = '/login';
          }, 1000);
        } else {
          loadingInstance.close();
          Message.warning(res.data.return_message);
        }
        return res;
      },
      err => {
        loadingInstance.close();
        Message.error('请求失败，请稍后再试');
        return Promise.reject(err);
      }
    );
  }
}

export default BaseModule;
