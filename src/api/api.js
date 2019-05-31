import qs from 'qs';
import axios from 'axios';
import { Toast, Indicator } from 'mint-ui';
const config = require('../../config');

// 设置 canRequest 变量 防止多次请求
window.canRequest = [];
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 响应时间
axios.defaults.timeout = 5 * 1000;
// 配置接口地址
axios.defaults.baseURL = '/api';

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	config => {
		Indicator.open();
		if (config.method === 'post' && config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
			config.data = qs.stringify(config.data);
		}
		return config;
	},
	err => {
		Indicator.close();
		Toast('请求错误');
		return Promise.reject(err);
	}
);

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
	res => {
		if (res.data.return_code === 0) {
			Indicator.close();
			// 设置全局变量 [手机号码验证状态]
			window.mobile_validated = res.headers.mobile_validated || false;
		} else if (res.data.return_code === -101) {
			Indicator.close();
		} else {
			Indicator.close();
			Toast(res.data.return_message);
		}
		return res;
	},
	err => {
		Indicator.close();
		Toast('请求失败，请稍后再试');
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
 * @param callback 成功回调
 */
const apiAxios = (method, url, params, callback) => {
	if (window.canRequest[callback] === undefined || window.canRequest[callback]) {
		window.canRequest[callback] = false;
	}
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
		delete window.canRequest[callback];
		if (resData && resData.hasOwnProperty('return_code')) {
			if (resData.return_code === -101) {
				// resData.data.url wechat url
				if (process.env.NODE_ENV !== 'development') {
					window.location = resData.data.url;
				} else if (process.env.NODE_ENV === 'development' && !config.dev.canRedirectWechat) {
					callback(resData);
				} else {
					window.location = resData.data.url;
				}
			} else {
				callback(resData);
			}
		} else {
			console.error('温馨提示：数据格式错误');
		}
	}).catch(err => {
		if (err) {
			let res = err.response;
			console.error('api error, HTTP CODE: ' + res.status);
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
	}
};