import axios from 'axios';
import { Loading, Message } from 'element-ui';

let loadingInstance = '';
let OK = '1';
let NOT_LOGIN = '-100';
// 后端服务器地址
let API_HOST = 'http://user-srv.7mud.com';

// 设置 canRequest 变量 防止多次请求
window.canRequest = [];
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
// 响应时间
axios.defaults.timeout = 5 * 1000;
// 配置接口地址
axios.defaults.baseURL = '/api';

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	config => {
		// 加载动画
		loadingInstance = Loading.service({
			lock: true,
			text: 'Loading',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		});
		if (config.method === 'post' && config.data && config.headers['Content-Type'] === 'application/json;charset=UTF-8') {
			config.data = JSON.stringify(config.data);
		}
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
axios.interceptors.response.use(
	res => {
		if (res.data.return_code === OK) {
			loadingInstance.close();
		} else if (res.data.return_code === NOT_LOGIN) {
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

// 参数过滤函数
const filterNull = (o) => {
	for (var key in o) {
		if (o[key] === null) {
			delete o[key];
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim();
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key]);
		} else if (toType(o[key]) === 'array') {
			o[key] = filterNull(o[key]);
		}
	}
	return o;
};

// 自定义判断元素类型JS
const toType = (obj) => {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

/**
 * 获取数据
 * @param method 需要请求type
 * @param url 需要请求数据的接口地址
 * @param params 提交的参数
 * @param callback 回调方法
 */
const apiAxios = (method, url, params, callback) => {
	if (params) {
		params = filterNull(params);
	}
	axios({
		method: method,
		url: url,
		data: params,
		withCredentials: false
	}).then(response => {
		const resData = response.data;
		if (resData && resData.hasOwnProperty('return_code')) {
			callback(resData);
		} else {
			console.error('温馨提示：数据格式错误');
		}
	}).catch(err => {
		if (err) {
			// let res = err.response;
			console.error('api error, HTTP CODE: ' + err);
		}
	});
};

// 返回在vue模板中的调用接口
export default {
	get: function (url, params, callback) {
		return apiAxios('GET', url, params, callback);
	},
	post: function (url, params, callback) {
		return apiAxios('POST', url, params, callback);
	},
	OK: OK,
	NOT_LOGIN: NOT_LOGIN,
	API_HOST: API_HOST
};
